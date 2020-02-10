var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3006;

var app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scrap", {useNewUrlParser: true});

require("./routes/html-routes.js")(app);


app.listen(PORT, function(){
    console.log("App running on " + PORT + ".");
});

