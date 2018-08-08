// Requiring path to use relative routes to our HTML files
var path = require("path");
var db = require("../models");

// Requiring custom middleware for checking if a user is logged in
require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/members", function(req, res) {
    console.log( req );
    db.Pet.findOne({
      where: {
        id: req.user.id
      }
    }).then(function(data) {
      res.render("index", {
        msg: "Welcome Camille",
        name: data.name,
        about: data.about,
        age: data.age,
        breed: data.breed,
        species: data.species
      });
    });
  });
  // pet profile
  // app.get("/api/new", function(req, res) {
  //   res.render("example");
  // });

  app.get("/addPet", function(req, res) {
    res.render("new-pet-form");
  });
};
