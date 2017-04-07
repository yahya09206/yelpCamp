//All the middleware will be added here
var middlewareObj = {};

//Campground Authorization
middleware.checkCampgroundOwnerShip = function(req,res,next){
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
middleware.checkCommentOwnerShip = function(req,res,next){
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
middleware.isLoggedin = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}



module.exports = middlewareObj;