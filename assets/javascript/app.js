var theThing = ["Godfather", "Godfather II", "Casino Movie", "Scarface", "Warriors Movie", "Goodfellas", "Carlito's Way", "Wolverine", "Lakers", "Redskins", "NBA Flops", "Cowboys Suck"];

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
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
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

          	var rating = (results[i].rating).toUpperCase();

            var p = $("<p>").text("Rating: " + rating);

            // Creating and storing an image tag
            var gifImage = $("<img>");
            
            gifImage.attr("class", "gif"); 
            gifImage.attr("data-state", "still");
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("src", results[i].images.fixed_height_still.url);

            gifDiv.append(p);
            gifDiv.append(gifImage);

            $("#gifs-appear").prepend(gifDiv);
          }
        })
};


function gifClick(){
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
 };
	// $(".gif").on("click", function() {
	// 	var state = $(this).attr("data-state");

	// 	if (state === "still") {
	// 		$(this).attr("src", $(this).attr("data-animate"));
	// 		$(this).attr("data-state", "animate");
 //      // } else {
 //      //   	$(this).attr("src", $(this).attr("data-still"));
 //      //   	$(this).attr("data-state", "still");
 //      // }
	// });

	$(document).on("click", ".gif", gifClick); 

	$(document).on("click", ".gifShow", gifShowInfo);

    renderButton();