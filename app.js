var express = require("express");
var app = express();

app.set("view engine", "ejs");
//landing page route
app.get("/", function(req,res){
	res.send("This will be the landing page");
});

app.listen(3000, function(){
	console.log("You are now listening to the smooth sounds of port3000");
});