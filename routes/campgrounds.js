var express = require("express");

var router = express.Router();

var Campground = require("../models/campground");

var middlewares = require("../middleware");
var {isLoggedIn, campgroundAuthorization} = middlewares; // destructuring assignment
// ====================
// CAMPGROUNDS ROUTES
// ====================
// ROOT ROUTE
router.get("/", function(req, res) {
    res.render("landing");
});

//INDEX - show all campgrounds
router.get("/campgrounds", function(req, res){
    // get all camps from db
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//NEW - show form to create new campground
router.get("/campgrounds/new", isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

//CREATE - add new campground to DB
router.post("/campgrounds", isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var location = req.body.location ? req.body.location : "天安门";
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user, // uses obj ref, therefore, comment.author.id is stored as on obj ID instead of whole obj
        username: req.user.username
    };
    var newCampground = {name: name, location: location, price: price, image: image, description: desc, author: author};
    // create a new campground and save it to db
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            req.flash("success", "Successfully added campground!");
            res.redirect("/campgrounds");     
        }
    });
});

// SHOW - shows more info about one campground
router.get("/campgrounds/:id", function(req, res){
    // popluates comments into campground, otherwise, comments inside campground is obj id
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if (err) {
          console.log(err);
      } else {
          res.render("campgrounds/show", {campground: foundCampground});
      }
   });
});

// EDIT
router.get("/campgrounds/:id/edit", isLoggedIn, campgroundAuthorization, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// UPDATE
router.put("/campgrounds/:id", isLoggedIn, campgroundAuthorization, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + updatedCampground._id);
        }
    });
});

// DESTORY
router.delete("/campgrounds/:id", isLoggedIn, campgroundAuthorization, function(req, res){
    Campground.findOneAndDelete({_id: req.params.id}, function(err, deletedCampground){
       if (err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
    });
});

module.exports = router;