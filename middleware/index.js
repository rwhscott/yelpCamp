var Campground = require("../models/campground"),
	Comment = require("../models/comment");

// middleware object
var middlewareObj = {};

// checkCampgroundOwnership middleware
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
	// is user logged in?
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function (err, foundCampground) {
			if (err) {
				req.flash("error", "Campground not found");
				res.redirect("back");
			}
			else {
				// Does the user own the Campground?
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				}
				else {
					req.flash("error", "You do not have permission to do that.");
					res.redirect("back");
				}
			}
		});
	}
	else {
		req.flash("error", "You need to be logged in to do that.");
		res.redirect("back");
	}
};

// checkCommentOwnership middleware
middlewareObj.checkCommentOwnership = function (req, res, next) {
	// is user logged in?
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function (err, foundComment) {
			if (err) {
				req.flash("error", "Comment not found");
				res.redirect("back");
			}
			else {
				// Does the user own the Comment?
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				}
				else {
					req.flash("error", "You do not have permission to do that.");
					res.redirect("back");
				}
			}
		});
	}
	else {
		req.flash("error", "You need to be logged in to do that.");
		res.redirect("back");
	}
};

// isLoggedIn middleware
middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You need to be logged in to do that.");
	res.redirect("/login");
};


module.exports = middlewareObj;