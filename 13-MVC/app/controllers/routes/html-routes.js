var Burger = require("../../models/burger.js");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    Burger.findAll().then(data => {
      
      res.render("main", {burgers : data});
    });
  });

};