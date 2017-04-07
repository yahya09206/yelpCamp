//All the middleware will be added here
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

//Campground Authorization
middlewareObj.checkCampgroundOwnerShip = function(req,res,next){
	if(req.isAuthenticated()){
			Campground.findById(req.params.id, function(err, foundCampground){
				if(err){
					res.redirect("back")
				}else{
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");
				}
				
			}
		});
	}else{
		res.redirect("back");
	}
}

//Comment authorization
middlewareObj.checkCommentOwnerShip = function(req,res,next){
	if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err){
					res.redirect("back")
				}else{
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");
				}
			}
		});
	}else{
		res.redirect("back");
	}
}

//logged in authorization
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please Login First!");
	res.redirect("/login");
}



module.exports = middlewareObj;