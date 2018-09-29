var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet facilisis magna, id rhoncus augue pretium in. Nam luctus lacus ut placerat ullamcorper. Pellentesque sodales aliquet eleifend. Nulla quam arcu, gravida vel felis vel, molestie facilisis nunc. Curabitur sed arcu metus. Sed sed sem mauris. Praesent tempor venenatis dui, non euismod libero tristique sit amet. Nullam ut risus ut dolor aliquet pellentesque."
    },
    {
        name: "Desert Mesa", 
        image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet facilisis magna, id rhoncus augue pretium in. Nam luctus lacus ut placerat ullamcorper. Pellentesque sodales aliquet eleifend. Nulla quam arcu, gravida vel felis vel, molestie facilisis nunc. Curabitur sed arcu metus. Sed sed sem mauris. Praesent tempor venenatis dui, non euismod libero tristique sit amet. Nullam ut risus ut dolor aliquet pellentesque."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet facilisis magna, id rhoncus augue pretium in. Nam luctus lacus ut placerat ullamcorper. Pellentesque sodales aliquet eleifend. Nulla quam arcu, gravida vel felis vel, molestie facilisis nunc. Curabitur sed arcu metus. Sed sed sem mauris. Praesent tempor venenatis dui, non euismod libero tristique sit amet. Nullam ut risus ut dolor aliquet pellentesque."
    }
];

function seedDB() {
    // removes all the campgrounds in db
    Campground.remove({}, function(err){
        // if (err) {
        //     console.log(err);
        // }
        // console.log("removed campgrounds");
        
        //     // add a few campgrounds
        // data.forEach(function(ele){
        //   Campground.create(ele, function(err, newCamp){
        //       if (err) {
        //           console.log(err);
        //       } else {
        //           console.log("add a new camp");
        //           // create a comment
        //           Comment.create({
        //                 text: "This place is great, but I wish there was internet",
        //                 author: "Homer"
        //           }, function(err, comment){
        //               if (err) {
        //                     console.log(err);
        //               } else {
        //                     newCamp.comments.push(comment);
        //                     newCamp.save();
        //                     console.log("create a new comment");
        //               }
        //           });
        //       }
        //   }) 
        // });
    });
    Comment.remove({}, function(err){
        if (err) {
            console.log(err);
        }
    });
}

module.exports = seedDB;