const express = require('express');
const app = express();
const Listing = require("./models/listing");
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

app.use(express.static(path.join(__dirname,"public")));
app.engine('ejs',ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})
app.get("/",(req,res)=>{
    res.send("I'm root");
})
// Create Route
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
})
app.post("/listings",async (req,res)=>{
    let newList = new Listing(req.body.list);
    await newList.save();
    res.redirect("/listings");
})
// Index Route
app.get("/listings",async(req,res)=>{
    const allList = await Listing.find({});
    res.render("./listings/index.ejs",{allList});
})

// Show Route
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    res.render("./listings/show.ejs",{list});
})
// edit or update..
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    res.render("./listings/edit.ejs",{list});
})
app.patch("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.list});
    res.redirect(`/listings/${id}`);
})
// Delete 
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})








// app.get("/testListing",async(req,res)=>{
//     let loc1 = new Listing({
//         title: "My new Villa",
//         description: "by the Beach",
//         price: 1500,
//         location: "Hyderabad, Goa",
//         country: "India"
//     })
//     await loc1.save();
//     res.send("success");
// })