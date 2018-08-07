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
    db.TodoTable.findAll({}).then(function(petTodoDB) {
      res.render("index", {
        msg: "Welcome Camille",
        examples: petTodoDB
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
