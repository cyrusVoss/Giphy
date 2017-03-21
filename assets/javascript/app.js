var theThing = ["Godfather", "Godfather II", "Casino Movie", "Scarface", "Warriors", "Goodfellas", "Blow", "Terminator", "X-Men", "Carlito's Way"];

function renderButton(){
    for (var j = 0; j < theThing.length; j++){
    	var theButton = $("<button>");
    	theButton.attr("type", "button"); 
    	theButton.attr("class", "btn btn-info gifShow");
    	theButton.attr("data-type", theThing[j]);  
    	theButton.text(theThing[j]);
    	$("#gifs").append(theButton); 
    }
}

      $("#addThing").on("click", function(event) {
        // event.preventDefault();

        $("#gifs").html("");
        // This line grabs the input from the textbox
        var thing = $("#inputThing").val().trim();

        // Adding movie from the textbox to our array
        theThing.push(thing);

        // Calling renderButtons which handles the processing of our movie array
        renderButton();
      });


    function gifShowInfo(){
    // $(".gifShow").on("click", function() {

    $("#gifs-appear").html("");
   
      var things = $(this).attr("data-type");

      // Constructing a queryURL using the animal name
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        things + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {

          var results = response.data;

          console.log(results[0]); 

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

          	var gifDiv = $("<div>"); 

          	gifDiv.attr("class", "left");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var gifImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            gifImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.append(p);
            gifDiv.append(gifImage);
            // p.append(animalImage); 

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear").prepend(gifDiv);
          }
        })
};
$(document).on("click", ".gifShow", gifShowInfo);

      renderButton();