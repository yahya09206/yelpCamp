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



module.exports = middlewareObj;