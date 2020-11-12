// Dependencies
var express = require("express"),
	router = express.Router(),
	Campground = require("../models/campground"),
	middleware = require("../middleware");


// ====================
// Campground Routes
// ====================

// INDEX route - show all campgrounds
router.get("/", function (req, res) {
	// Get all campgrounds from DB
	Campground.find({}, function (err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", { campgrounds: allCampgrounds, page: 'campgrounds' });
		}
	});
});

// NEW route - show form to create new campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
	res.render("campgrounds/new");
});

// CREATE route - add new campground to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var address = req.body.address;
	var postcode = req.body.postcode;
	var price = req.body.price;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = { name: name, image: image, description: description, address: address, postcode: postcode, price: price, author: author };
	// create a new campground and save to DB
	Campground.create(newCampground, function (err, createdCampground) {
		if (err) {
			console.log(err);
		}
		else {
			// redirect to campgrounds page
			console.log(createdCampground)
			res.redirect("/campgrounds");
		}
	});
});

// SHOW route - shows more information about one campground
router.get("/:id", function (req, res) {
	// find campground with supplied ID
	Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
		if (err) {
			console.log(err);
		}
		else {
			// render show template with that campground
			res.render("campgrounds/show", { campground: foundCampground });
		}
	});
});

// EDIT route - shows form to edit a Campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
	Campground.findById(req.params.id, function (err, foundCampground) {
		res.render("campgrounds/edit", { campground: foundCampground });
	});
});

// UPDATE route - update an existing Campground
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
	// find and update correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
		if (err) {
			res.redirect("/campgrounds")
		}
		else {
			// redirect to SHOW route
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY route - delete an existing Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
	Campground.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.redirect("/campgrounds");
		}
		else {
			req.flash("success", "Campground deleted");
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;