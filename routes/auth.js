var express = require("express"),
    passport = require("passport");

var router = express.Router();

var User = require("../models/user");
// ====================
// AUTH ROUTES
// ====================
router.get("/register", function(req, res){
    res.render("register");
})

router.post("/register", function(req, res){
    let newUser = new User({
       username: req.body.username 
    });
    User.register(newUser, req.body.password, function(err, user){
       if (err) {
            req.flash("error", err.message);
            res.redirect("/register");
       } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", user.usernmae + ", Welcome to YelpCamp!");
                res.redirect("/campgrounds");
            })
       }
    });
})

router.get("/login", function(req, res){
   res.render("login"); 
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){});

router.get("/logout", function(req, res){
    req.logout();
    req.flash('success', 'Successfully Logged Out!');
    res.redirect("/campgrounds");
});

module.exports = router;