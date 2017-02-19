var express = require("express");
var app = express();

//set view engine to ejs
app.set("view engine", "ejs");

//landing page route
app.get("/", function(req,res){
	res.send("This will be the landing page");
});

app.get("/campgrounds", function(req,res) {
	var campgrounds = [
		{name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
		{name: "Granite Hill", image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
		{name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8456/8006869967_de2ed3e564.jpg"}
	]
});

//port for app to be displayed
app.listen(3000, function(){
	console.log("You are now listening to the smooth sounds of port3000");
});