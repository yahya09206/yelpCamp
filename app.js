var express = require("express");
var app = express();

//set view engine to ejs
app.set("view engine", "ejs");

//landing page route
app.get("/", function(req,res){
	res.send("This will be the landing page");
});

app.get("/campgrounds", function(req,res) {
	var
});

//port for app to be displayed
app.listen(3000, function(){
	console.log("You are now listening to the smooth sounds of port3000");
});