var db = require("../models");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");


module.exports = function(app){
    app.get("/", function(req, res){
        axios.get("https://www.recordcourier.com/").then(function(response){
            var $ = cheerio.load(response.data); 
           
            $("article h6").each(function(i, element){
                var result = {};
                if($(this).children("a").attr("href")){
                result.headline = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");
                }
                db.Article.create(result).then(function(dbArticle){
                    res.json(dbArticle);
                });
            });
            
        });

    });
    app.get("/articles", function(req, res){
        db.Article.find({}).then(function(dbArticle){
        res.json(dbArticle);
        });
    });
    
    app.get("/articles/:id", function(req, res){
        db.Article.remove({_id: req.params.id}).then(function(){
            res.json({item: "removed"});
        });
    });
};