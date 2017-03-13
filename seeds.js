var mongoose = require("mongoose");
var Campground = require("./models/campground");

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
			Campground.create(seed, function(err,data){
				if(err){
					console.log(err);
				}else {
					console.log("Added campground");
				}
			});
		});
		}
	});
}

module.exports = seedDB;