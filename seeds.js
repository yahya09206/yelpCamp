var mongoose = require("mongoose");
var Campground = require("./models/campground");

var data = [
	{
		name: "Cloud's rest",
		image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
		description: "blah blah blah"
	},
	{
		name: "Cloud's rest",
		image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
		description: "blah blah blah"
	},
	{
		name: "Cloud's rest",
		image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
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
	}
});
	//add a few campgrounds
	Campground.create({}, function(){

	});
}

module.exports = seedDB;