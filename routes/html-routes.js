var db = require("../models");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
// var exphbs = require("express-handlebars");



module.exports = function(app){

// app.engine("handlebars", exphbs({defaultLayout: "main"}));
// app.set("viet engine", "handlebars");
    app.get("/", function(req, res){
        axios.get("https://www.recordcourier.com/").then(function(response){
            var $ = cheerio.load(response.data); 
           
            $("article h6").each(function(i, element){
                var result = {};
                if($(this).children("a").attr("href")){
                result.headline = $(this).children("a").text();
                result.url = $(this).children("a").attr("href");
                }
                db.Article.create(result).then(function(dbArticle){
                    console.log("scrap complete");
                });
            });
        });
        res.redirect("/articles");
    });
    app.get("/articles", function(req, res){
        db.Article.find({}).then(function(dbArticle){
            var articlesObj = {
                articles: dbArticle
            };
            console.log(articlesObj.articles[0].headline);
            res.render("index", articlesObj);
        });
    });
    
    app.get("/delete/:id", function(req, res){
        db.Article.remove({_id: req.params.id}).then(function(){
            res.json({item: "removed"});
        });
    });
    app.get("/delete/all", function(req, res){
        db.Article.remove({_id: req.params.id}).then(function(){
            res.json({item: "removed"});
        });
    });
};