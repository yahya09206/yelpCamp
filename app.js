//Requirements
var express 		= require("express"),
		app 				= express(),
		bodyParser 	= require("body-parser"),
	 	mongoose 		= require("mongoose"),
	 	flash				= require("connect-flash"),
	 	passport		= require("passport"),
	 	localStrategy = require("passport-local"),
	 	methodOverride = require("method-override"),
	 	Campground 	= require("./models/campground"),
	 	Comment 		= require("./models/comment"),
	 	User 				= require("./models/user"),
	 	seedDB 			= require("./seeds")

var commentRoutes 		= require("./routes/comments"),
		campgroundRoutes	= require("./routes/campgrounds"),
		indexRoutes 			= require("./routes/index")

//connect to mongoose
mongoose.connect("mongodb://localhost/yelp_camp");
//use body parser
app.use(bodyParser.urlencoded({extended: true}));
//set view engine to ejs
app.set("view engine", "ejs");
//Seed file everytime server is run
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); seed db

//PASSPORT CONFIG
app.use(require("express-session")({
	secret: "Coding is life",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.message = req.flash("error");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


//port for app to be displayed
app.listen(3000, function(){
	console.log("You are now listening to the smooth sounds of port3000");
});