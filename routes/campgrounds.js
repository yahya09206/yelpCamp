var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/", function(req,res) {
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
router.post("/", isLoggedIn, function(req,res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.name;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampGround = {name: name, image: image, description: desc, author: author}
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
router.get("/new", isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req,res){
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

//EDIT CAMPGROound route
router.get("/:id/edit", function(req,res){

});

//Update campground route
router.put("/:id", function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//destroy campground route
router.delete("/:id", function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else {
			res.redirect("/campgrounds");
		}
	});
});

//checks authentication
function checkCampgroundOwnerShip(req,res,next){
	if(req.isAuthenticated()){
			Campground.findById(req.params.id, function(err, foundCampground){
				if(err){
					res.redirect("/campgrounds")
				}else{
				if(foundCampground.author.id.equals(req.user._id)){
					res.render("campgrounds/edit", {campground: foundCampground});
				}else{
					res.send("You need permission to do that");
				}
				
			}
		});
	}else{
		res.redirect("back");
	}
}

//logged in middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


module.exports = router;