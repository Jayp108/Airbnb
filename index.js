
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path"); 
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


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

app.set("'view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));



app.get("/listings/new", (req,res) =>{
    res.render("listings/new.ejs");
}); 

// Index Route
app.get("/listings",async (req, res) =>{
    console.log("Trying to fetch listings...");
    const allListings = await Listing.find();
        res.render("listings/index.ejs", {allListings})
    });

     // New Route
app.get("/listings/new", (req,res) =>{
        res.render("listings/new.ejs");
    }); 

    // show Route
// app.get("/listings/:id", async(req,res) =>{
//         let {id} = req.params;
//       const listing = await Listing.findById(id);
//       res.render("listings/show.ejs", {listing});
//     });

//  show Route
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.send("Invalid Listing ID");
    }
  
    try {
      const listing = await Listing.findById(id);
      res.render("listings/show.ejs", { listing });
    } catch (err) {
      res.status(500).send("invalid");
    }
  });

//   Create Route
 app.post("/listings", async (req,res) =>{
        //  let listing = req.body.listing;
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
 });

        // Edit Route
        app.get("/listings/:id/edit", async (req,res) =>{
            let{id} = req.params;
            const listing = await Listing.findById(id);
            res.render("listings/edit.ejs", {listing});
        });

    // Update Route
    app.put("/listings/:id", async (req,res) =>{
        let{id} = req.params;
      await Listing.findByIdAndUpdate(id, {...req.body.listing});
        res.redirect(`/listings/${id}`);
    });


    app.listen(8080, () =>{
        console.log("server is listening to port 8080:");
    });

    // Delete Route
    app.delete("/listings/:id", async (req, res) =>{
        let{id} = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        res.redirect("/listings");
    })
     

    // app.get("/testListing", async (req,res) =>{
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "By the beach",
//         price: 1200,
//         location: "GOA Beach",
//         Country: "India",
//     }); 

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });