// Dependencies
var express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User = require("../models/user");


// ====================
// ROOT Route - home page
// ====================

router.get("/", function (req, res) {
	res.render("landing");
});


// ====================
// Auth Routes
// ====================

// Show register form
router.get("/register", function (req, res) {
	res.render("register", { page: 'register' });
});

// User registration logic
router.post("/register", function (req, res) {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			console.log(err.message);
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function () {
			req.flash("success", "Welcome to yelpCamp, " + user.username + "!");
			res.redirect("/campgrounds");
		});
	});
});

// Show login form
router.get("/login", function (req, res) {
	res.render("login", { page: 'login' });
});

// User login logic
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function (req, res) {
	});

// User logout route
router.get("/logout", function (req, res) {
	req.logOut();
	req.flash("success", "You are now logged out.");
	res.redirect("/campgrounds");
});

module.exports = router;