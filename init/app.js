const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() =>{
    console.log("connect to mongodb successfully");
})
.catch((err) =>{
    console.log(err);
});

async function main () {
    await mongoose.connect(MONGO_URL); 
}

const initDb = async () =>{
    await Listing.deleteMany({}); // it is delete the data from mongodb
    await Listing.insertMany(initData.data); // it is insert the data in the mongodb
    console.log("data was initialized");
}

initDb(); // it is saving the database in the mongodb