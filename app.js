var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//use body parser
app.use(bodyParser.urlencoded({extended: true}));
//set view engine to ejs
app.set("view engine", "ejs");

//landing page route
app.get("/", function(req,res){
	res.render("landing");
});

app.get("/campgrounds", function(req,res) {
	var campgrounds = [
		{name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
		{name: "Granite Hill", image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
		{name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8456/8006869967_de2ed3e564.jpg"}
	]
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res){
	res.send("You hit the route");
	//get data from form and add to campgrounds array
	//redirect to campgrounds page
});

app.get("/campgrounds/new", function(req,res){

});

//port for app to be displayed
app.listen(3000, function(){
	console.log("You are now listening to the smooth sounds of port3000");
});