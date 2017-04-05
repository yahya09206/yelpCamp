//landing page route
app.get("/", function(req,res){
	res.render("landing");
});


//AUTH ROUTES

//show register form
app.get("/register", function(req,res){
	res.render("register");
});

//signup logic
app.post("/register", function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds");
		});
	});
});

//show login form
app.get("/login",function(req,res){
	res.render("login");
});

//handle login logic
app.post("/login",passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req,res){
});

//logout route
app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});

//logged in middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}