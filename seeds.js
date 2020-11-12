var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://unsplash.com/photos/euaPfbR6nC0/download?force=true&w=640",
        description: "Fusce blandit nulla vitae interdum dapibus. Nulla facilisi. Donec tempus pellentesque mollis. Praesent malesuada erat ante, nec ultricies diam faucibus at. Donec nisi quam, convallis porttitor placerat eu, ullamcorper vitae ex. In hac habitasse platea dictumst. Curabitur scelerisque turpis ac pharetra feugiat. Duis ligula urna, bibendum non scelerisque sit amet, dictum non neque. Phasellus semper eu purus ut rhoncus. Vivamus eu tempus erat. Nulla facilisi. Nunc ut congue mauris. Integer ultricies cursus pharetra.",
        price: "9.99",
        address: "Cairngorm National Park, Scotland",
        postcode: "PH26 3HG",
        author: {
            id: "5e9f75ad9925337169db4f02",
            username: "rob"
        }
    },
    {
        name: "Serene Lake",
        image: "https://unsplash.com/photos/eDgUyGu93Yw/download?force=true&w=640",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat nisi ac orci placerat viverra. Aliquam vel dignissim enim. Sed mauris erat, auctor quis elementum et, ullamcorper vitae dui. Pellentesque finibus risus vitae libero sollicitudin, quis finibus ipsum facilisis. Etiam tristique enim eget arcu imperdiet condimentum. Suspendisse nibh velit, convallis et tincidunt sit amet, sollicitudin porttitor enim. Aliquam erat volutpat. Nulla dapibus tellus lacus, ut ultricies nisi blandit id. Sed id leo diam. Quisque vel aliquam nunc, non egestas nulla.",
        price: "7.50",
        address: "Snowdonia National Park, Wales",
        postcode: "LL48 6LF",
        author: {
            id: "5e9f75ad9925337169db4f02",
            username: "rob"
        }
    },
    {
        name: "Snowy Peak",
        image: "https://unsplash.com/photos/pl1mhwMctJc/download?force=true&w=640",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo fringilla tincidunt. Proin diam leo, eleifend dictum vehicula a, dapibus id nisl. Nam tincidunt erat semper, volutpat quam nec, rutrum diam. Sed volutpat justo id venenatis laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam in mattis nunc, vitae sodales arcu. Quisque vel pharetra nulla.",
        price: "13.99",
        address: "Pyrénées National Park, France",
        postcode: "65120 Gavarnie-Gèdre",
        author: {
            id: "5e9f75ad9925337169db4f02",
            username: "rob"
        }
    }
]

function seedDB() {
    // Remove all Campgrounds
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Removed Campgrounds");
            // Add a few Campgrounds
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Added a Campground");
                        // Create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet.",
                                author: {
                                    id: "5e9f75ad9925337169db4f02",
                                    username: "rob"
                                }
                            }, function (err, comment) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new Comment");
                                }
                            }
                        )
                    }
                });
            });
        }
    });
}

module.exports = seedDB;