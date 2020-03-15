$(function(){

    $("#article-delete").on("click", function(){
        var id = $(this).data("id");
        
        $.ajax("/delete/" + id, {
            type:"GET"
        }).then(
            function(){
                console.log("deleted article id: " + id);
                location.reload();
            }
        )
    });

});