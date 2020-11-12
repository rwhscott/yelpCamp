// Dependencies
var express = require("express"),
	router = express.Router({ mergeParams: true }),
	Campground = require("../models/campground"),
	Comment = require("../models/comment"),
	middleware = require("../middleware");


// ====================
// Comments Routes
// ====================

// NEW route - show form to create a new comment
router.get("/new", middleware.isLoggedIn, function (req, res) {
	// find Campground by Id
	Campground.findById(req.params.id, function (err, campground) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("comments/new", { campground: campground });
		}
	});
});

// CREATE route - add new comment to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
	// lookup campground using ID
	Campground.findById(req.params.id, function (err, campground) {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		}
		else {
			// create new comment
			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					req.flash("error", "Something went wrong");
					console.log(err);
				}
				else {
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					// connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					// redirect to campground show route
					req.flash("success", "Successfully added a comment.");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

/// EDIT route - shows form to edit a comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
	Comment.findById(req.params.comment_id, function (err, foundComment) {
		if (err) {
			res.redirect("back");
		}
		else {
			res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
		}
	});
});

// UPDATE route - update an existing comment
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
		if (err) {
			res.redirect("back");
		}
		else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY route - delete an existing comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function (err) {
		if (err) {
			res.redirect("back");
		}
		else {
			req.flash("success", "Comment deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;