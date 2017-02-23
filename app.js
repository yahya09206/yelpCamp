var express 		= require("express"),
		app 				= express(),
		bodyParser 	= require("body-parser"),
	 	mongoose 		= require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
//use body parser
app.use(bodyParser.urlencoded({extended: true}));
//set view engine to ejs
app.set("view engine", "ejs");



//Schema setup

var campgrounds = [
		{name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
		{name: "Granite Hill", image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
		{name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8456/8006869967_de2ed3e564.jpg"}
	]

//landing page route
app.get("/", function(req,res){
	res.render("landing");
});

app.get("/campgrounds", function(req,res) {
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.name
	var newCampGround = {name: name, image: image}
	campgrounds.push(newCampGround);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
	res.render("new.ejs");
});

//port for app to be displayed
app.listen(3000, function(){
	console.log("You are now listening to the smooth sounds of port3000");
});