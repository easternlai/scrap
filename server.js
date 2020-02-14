var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
require("dotenv").config();
var db = require("./models");

var PORT = 3006;

var MONGODB_URI = process.env.MONGODB_URI;

var app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// mongoose.connect("mongodb://localhost/scrap", {useNewUrlParser: true});
mongoose.connect("mongodb://easternlai:Password1@ds339968.mlab.com:39968/heroku_9g9z8b7r");

require("./routes/html-routes.js")(app);


app.listen(PORT, function(){
    console.log("App running on " + PORT + ".");
});

