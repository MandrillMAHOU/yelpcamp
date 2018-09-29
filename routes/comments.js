var express = require("express");

var router = express.Router();

var Campground = require("../models/campground"),
    Comment = require("../models/comment");
    
var middlewares = require("../middleware");
var {isLoggedIn, commentAuthorization} = middlewares; // destructuring assignment
// ====================
// COMMENTS ROUTES
// ====================
// NEW
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
       if (err) {
           console.log(err);
       } else {
           res.render("comments/new", {campground: foundCampground});
       }
    });
});

// CREATE
router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    // look up campground by id
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, newComment){
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to new comment
                    var author = {
                        id: req.user, // uses obj ref, therefore, comment.author.id is stored as on obj ID instead of whole obj
                        username: req.user.username
                    };
                    newComment.author = author;
                    newComment.save();
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                     req.flash("success", "Successfully added comment!");
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
           
        }
    });
});

// EDIT COMMENT
router.get("/campgrounds/:id/comments/:comment_id/edit", isLoggedIn, commentAuthorization, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campgroundId: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE COMMENT
router.put("/campgrounds/:id/comments/:comment_id", isLoggedIn, commentAuthorization, function(req, res){
    Comment.findOneAndUpdate({_id: req.params.comment_id}, req.body.comment, function(err, updatedComment){
       if (err) {
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DELETE COMMENT
router.delete("/campgrounds/:id/comments/:comment_id", isLoggedIn, commentAuthorization, function(req, res){
   Comment.findOneAndDelete({_id: req.params.comment_id}, function(err, deletedComment){
       if (err) {
           res.redirect("back");
       } else {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

module.exports = router;