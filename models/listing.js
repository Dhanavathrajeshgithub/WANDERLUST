const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://i0.wp.com/farm4.static.flickr.com/3408/3410783929_051d93bc86.jpg",
        set: (v)=> v==="" ? "https://i0.wp.com/farm4.static.flickr.com/3408/3410783929_051d93bc86.jpg" : v 
    },
    price: Number,
    location: String,
    country: String
});

const Listing = mongoose.model("listing",listingSchema);
module.exports = Listing;