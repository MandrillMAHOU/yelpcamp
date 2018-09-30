// ====================
// CUSTOM MIDDLEWARES
// ====================
var Campground = require("../models/campground"),
    Comment = require("../models/comment");

var middlewares = {};

middlewares.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that"); //flash(key, message)
    res.redirect("/login");
}

middlewares.campgroundAuthorization = function (req, res, next) {
    Campground.findById(req.params.id, function(err, foundCampground){
       if (err) {
           req.flash("error", "Internal error");
           res.redirect("back");
       } else {
            // checks if cur logged in user is the one created campground
           if (foundCampground.author.id.equals(req.user._id)) { 
               next();
           } else {
               req.flash("error", "Not authorized");
               res.redirect("back");
           }
       }
    });
}

middlewares.commentAuthorization = function (req, res, next) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if (err) {
           req.flash("error", "Internal error");
           res.redirect("back");
       } else {
            // checks if cur logged in user is the one created campground
           if (foundComment.author.id.equals(req.user._id)) { 
               next();
           } else {
               req.flash("error", "Not authorized");
               res.redirect("back");
           }
       }
    });
}

middlewares.pwValidation = function(req, res, next) {
    let pw = req.body.password;
    if (pw.length < 6) {
        req.flash("error", "Password is invalid");
        return res.redirect("/register");
    }
    next();
}

module.exports = middlewares;