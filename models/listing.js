const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: {
      filename: String,
      url: {
        type: String,
        default:
          "https://plus.unsplash.com/premium_photo-1712604750756-48015b34e2df?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
    },
    price: Number,
    location: String,
    country: String,
  });
  
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;