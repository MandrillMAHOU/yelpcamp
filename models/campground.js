var mongoose = require("mongoose");

// schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    location: String,
    image: String,
    description: String,
    created: {
      type: Date,
      default: Date.now
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});
var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;