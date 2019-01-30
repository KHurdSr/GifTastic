$(document).ready(function(){

    var artists = ["Duke Ellington", "Louis Armstrong", "Prince", "Michael Jackson", "Aretha Franklin", "Ray Charles", "Billie Holiday", "Whitney Houston", "James Brown", "Nat King Cole"]
    GIFArea = ""
   
    function renderButtons() {
    
    $("#artists-view").empty();
    
    for (var i=0; i < artists.length; i++) {
    
    var a = $('<button>');
    
    a.addClass('artist');
    
    a.attr('data-search', artists[i]);
    
    a.text(artists[i]);

    $("#artists-view").append(a);
    }
    s=
    $("#artist-input").focus();
    
    }
    
    renderButtons();
    
    $("#add-artist").on('click', function() {
    
    event.preventDefault();
    
    var artist = $("#artist-input").val().trim();
    
    artists.push(artist);
    
    renderButtons();
    
    });
    
    $(document).on('click', 'button',  function() {
            
     $('#GIFArea').empty(); 
     var b = $(this).attr('data-search');		
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=8THCLlv3pAP45AtRReYofGFGJBh2fqPB";  
     console.log(queryURL); 

     $.ajax({
     url: queryURL,
     method: 'GET'
    })
                
    .done(function(response) {
    console.log(response);
                  
    var results = response.data;
                
    for (var i = 0; i < results.length; i++) {
                
    var gifDiv = $('<div class="item">');
                       
    var rating = results[i].rating;
                
    var r = $('<p>').text("Rating: " + rating);
                
    var gifImage = $('<img>');
                
    gifImage.attr('src', results[i].images.fixed_height_still.url)
    .attr('data-still', results[i].images.fixed_height_still.url)
    .attr('data-animate', results[i].images.fixed_height.url)
    .attr('data-state', "still")
    .addClass("showImage");
                
    gifDiv.append(r)
    .append(gifImage);	                    
    
     $('#GIFArea').prepend(gifDiv);
    }
    
     });
    });
    
    
    $(document).on('click', '.showImage',  function() {
    
    var state = $(this).data('state');
            
    if (state == "still") {
    console.log("still image works");
             
    $(this).attr('src', $(this).data('animate'))
    .data('state', 'animate');
    } else {
            
    console.log("animated image works");
    $(this).attr('src', $(this).data('still'))
    .data('state', 'still');               
    }
    
    });
    
    });