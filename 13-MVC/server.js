var express = require("express");
const path = require("path");

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./app/public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Set Handlebars.
var exphbs = require("express-handlebars");

app.set('views', path.join(__dirname, '/app/views'));

app.engine("hbs", exphbs({ 
        extname: "hbs",
        defaultLayout: "index",
        layoutsDir: __dirname + "/app/views/layouts",
        partialsDir: __dirname + "/app/views/partials"
    }));
app.set("view engine", "hbs");
// Routes
// =============================================================
require("./app/controllers/routes/api-routes.js")(app);

// Here we introduce HTML routing to serve different HTML files
require("./app/controllers/routes/html-routes.js")(app);

// Import routes and give the server access to them.

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
