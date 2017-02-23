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
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

//model
var Campground = mongoose.model("Campground", campgroundSchema);
//Create campground inside of db
// Campground.create(
// 	{
// 		name: "Granite Hill", 
// 		image: "https://farm8.staticflickr.com/7042/7121867321_65b5f46ef1.jpg"
// 	},function(err,campground){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log("Newly Created Campground");
// 			console.log(campground);
// 		}
// 	});


//landing page route
app.get("/", function(req,res){
	res.render("landing");
});

app.get("/campgrounds", function(req,res) {
	//Get All campgrounds from db
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds", {campgrounds: allCampgrounds});
		}
	});
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