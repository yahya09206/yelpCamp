var mongoose 		= require("mongoose");
var Campground 	= require("./models/campground");
var Comment 		= require("./models/comment");

var data = [
	{
		name: "Cloud's rest",
		image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla fermentum dictum. Sed tortor sem, sagittis sed sollicitudin et, tempor eu justo. Phasellus faucibus semper erat vitae laoreet. Donec iaculis, risus venenatis imperdiet rutrum, ante orci convallis enim, vel ultricies mi orci et diam. Quisque non ex non leo mollis pulvinar. Nulla facilisi. Donec laoreet orci sed neque tristique aliquam. In porttitor blandit libero non hendrerit. Suspendisse dictum, elit in aliquam gravida, nunc velit ultrices magna, vitae pellentesque elit lorem quis quam. Curabitur faucibus, metus ut dictum viverra, nibh est semper odio, vitae placerat felis sapien vel leo. Ut lacus lacus, euismod vel rutrum sed, gravida in velit. Curabitur tempus cursus nulla at vestibulum. Aenean bibendum pulvinar enim, ut tincidunt ante vulputate nec. Suspendisse potenti."
	},
	{
		name: "Desert Mesa",
		image: "https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla fermentum dictum. Sed tortor sem, sagittis sed sollicitudin et, tempor eu justo. Phasellus faucibus semper erat vitae laoreet. Donec iaculis, risus venenatis imperdiet rutrum, ante orci convallis enim, vel ultricies mi orci et diam. Quisque non ex non leo mollis pulvinar. Nulla facilisi. Donec laoreet orci sed neque tristique aliquam. In porttitor blandit libero non hendrerit. Suspendisse dictum, elit in aliquam gravida, nunc velit ultrices magna, vitae pellentesque elit lorem quis quam. Curabitur faucibus, metus ut dictum viverra, nibh est semper odio, vitae placerat felis sapien vel leo. Ut lacus lacus, euismod vel rutrum sed, gravida in velit. Curabitur tempus cursus nulla at vestibulum. Aenean bibendum pulvinar enim, ut tincidunt ante vulputate nec. Suspendisse potenti."
	},
	{
		name: "Canyon Floor",
		image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla fermentum dictum. Sed tortor sem, sagittis sed sollicitudin et, tempor eu justo. Phasellus faucibus semper erat vitae laoreet. Donec iaculis, risus venenatis imperdiet rutrum, ante orci convallis enim, vel ultricies mi orci et diam. Quisque non ex non leo mollis pulvinar. Nulla facilisi. Donec laoreet orci sed neque tristique aliquam. In porttitor blandit libero non hendrerit. Suspendisse dictum, elit in aliquam gravida, nunc velit ultrices magna, vitae pellentesque elit lorem quis quam. Curabitur faucibus, metus ut dictum viverra, nibh est semper odio, vitae placerat felis sapien vel leo. Ut lacus lacus, euismod vel rutrum sed, gravida in velit. Curabitur tempus cursus nulla at vestibulum. Aenean bibendum pulvinar enim, ut tincidunt ante vulputate nec. Suspendisse potenti."
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