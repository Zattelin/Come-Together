// Requiring models and passport
var db = require("../models");
var passport = require("../config/passport");
//
module.exports = function(app) {
  // Using the passport.authenticate middleware
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // sending the user back the route to the members page
    res.json("/members");
  });
  // Route for signing up a user,otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });
  //
  // Route for logging user out
  app.get("/logout", function(req, res) {
    console.log("testing 123");
    req.logout();
    res.redirect("/");
  });
  //
  // Route for getting some data about user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id not password
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};

// Create a new example
// app.post("/api/TodoTable/:id", function(req, res) {
//   db.TodoTable.create({
//     todo: req.body.todo
//   }).then(function(petTodoDB) {
//     res.json(petTodoDB);
//   });
// });

// // PUT route for updating posts
// // handled in the ajax call
// // app.put("/api/TodoTable/:id", function(req, res) {
// //   db.TodoTable.update(req.body,
// //     {
// //       where: {
// //         id: req.params.id
// //       }
// //     })
// //     .then(function(petTodoDB) {
// //       res.json(petTodoDB);
// //     });
// // });

// // Delete an example by id
// app.delete("/api/examples/:id", function(req, res) {
//   db.Example.destroy({ where: { id: req.params.id } }).then(function(
//     dbExample
//   ) {
//     res.json(dbExample);
//   });
// });
