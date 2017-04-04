//Requirements
var express 		= require("express"),
		app 				= express(),
		bodyParser 	= require("body-parser"),
	 	mongoose 		= require("mongoose"),
	 	passport		= require("passport"),
	 	localStrategy = require("passport-local"),
	 	Campground 	= require("./models/campground"),
	 	Comment 		= require("./models/comment"),
	 	User 				= require("./models/user"),
	 	seedDB 			= require("./seeds")

//connect to mongoose
mongoose.connect("mongodb://localhost/yelp_camp");
//use body parser
app.use(bodyParser.urlencoded({extended: true}));
//set view engine to ejs
app.set("view engine", "ejs");
//Seed file everytime server is run
app.use(express.static(__dirname + "/public"));
seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
	secret: "Coding is life",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//landing page route
app.get("/", function(req,res){
	res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req,res) {
	//Get All campgrounds from db
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

//CREATE - add new campground to db
app.post("/campgrounds", function(req,res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.name;
	var dsc = req.body.description;
	var newCampGround = {name: name, image: image, description: dsc}
	//Create a new campground and save to db
	Campground.create(newCampGround, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req,res){
	res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
	//find campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err)
		}else{
			console.log(foundCampground)
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//New route for comments
app.get("/campgrounds/:id/comments/new", function(req,res){
	//find campground by id
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new", {campground: campground});
		}
	});
});

//POST route for comments
app.post("/campgrounds/:id/comments", function(req,res){
	//lookup campground using ID
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
			res.direct("/campgrounds");
		}else{
			Comment.create(req.body.comment, function(err,comment){
				if(err){
					console.log(err);
				}else{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

//port for app to be displayed
app.listen(3000, function(){
	console.log("You are now listening to the smooth sounds of port3000");
});