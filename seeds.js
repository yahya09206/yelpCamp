var mongoose 		= require("mongoose");
var Campground 	= require("./models/campground");
var Comment 		= require("./models/comment");

var data = [
	{
		name: "Cloud's rest",
		image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
		description: "blah blah blah"
	},
	{
		name: "Desert Mesa",
		image: "https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg",
		description: "blah blah blah"
	},
	{
		name: "Canyon Floor",
		image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
		description: "blah blah blah"
	}

]

function seedDB(){
	//Remove all campgrounds
	Campground.remove({}, function(err){
	if(err){
		console.log(err);
	}else {
		console.log("removed campgrounds");
		//add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err,campground){
				if(err){
					console.log(err);
				}else {
					console.log("Added campground");
					//create comment
					Comment.create(
						{
							text: "This place is great but I wish there was internet",
							author: "Homer"
						}, function(err,comment){
							if(err){
								console.log(err);
							}else{
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment");
							}
								
						});
				}
			});
		});
		}
	});
}

module.exports = seedDB;