var express = require("express"),
    expressSession = require("express-session"),
    bodyParser = require("body-parser"),
    flash = require("connect-flash"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    localStrategy = require("passport-local");

var Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user");

var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    authRoutes = require("./routes/auth");

var seedDB = require("./seeds");
// seedDB();

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public")); // __dirname: workspace/realYelpCamp
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelpcamp", { useNewUrlParser: true });

// passport config
app.use(expressSession({
    secret: "I am your father",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(initSet); // pass user obj to every page
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));


// routes config
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp camp server has started!");
});
// ====================
// CUSTOM MIDDLEWARES
// ====================
function initSet(req, res, next) {
    res.locals.currentUser = req.user; // currentUser in every page
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
}