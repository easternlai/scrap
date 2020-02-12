# Scrape

## Technologies Used

1. Javascript
2. Express
3. CSS
4. NPM
5. Git Bash
6. Heroku
7. 

## Program Description

This website presents to the users articles scrapped from a news website and displays this displays the top 10.  

## Code sample

The following code illustrates the API call and redirect.  

***
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
***
