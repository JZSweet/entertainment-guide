var storedShows = JSON.parse(localStorage.getItem("save-shows")) || [];
console.log(storedShows)
console.log(storedShows.length)

$("#clear-shows").on("click", function(){
    console.log("clicked clear shows")
    localStorage.clear("save-shows");
    storedShows = [];
    console.log(storedShows)
})


if (storedShows !== null) {
    storedShows.forEach(async function(showName){
        var tvMazeResponses = await tvMazeCall(showName);    
        var tvMazeFirstResponse = tvMazeResponses[0];  

        var omdbResponse = await omdbCall(showName);        
        console.log('tvMazeResponse: ', tvMazeFirstResponse);
        console.log('Omdb: ', omdbResponse);

       // grab and append title 
        var showArticle$ = $('<div>').attr('class', 'columns mb-5 show-article');
       
        var showNameTitle$ = $('<p class="column fav-show-title">').text(tvMazeFirstResponse.show.name)
        
        showArticle$.append(showNameTitle$);

        // grab and append image
        var newImg = $("<img class='column is-1'>")
        $(newImg).attr("src", omdbResponse.Poster);
        showArticle$.append(newImg);
        
        var showDay$ = $('<h3 class="column is-1">').text("Day: " + tvMazeFirstResponse.show.schedule.days)
        showArticle$.append(showDay$);

        var showTime$ = $('<h3 class="column is-1">').text("Time: " + tvMazeFirstResponse.show.schedule.time)
        showArticle$.append(showTime$);

        var showNetwork = tvMazeFirstResponse.show.network
        
        if (showNetwork === null) {
            var showStatus$ = $('<h3 class="column is-1">').text("This show is not playing on TV.")
        } else {
            var showStatus$ = $('<h3 class="column is-1">').text("This show is playing on TV")
            var showNetwork$ = $('<h3 class="column is-1">').text("Network: " + tvMazeFirstResponse.show.network.name)
        }
        showArticle$.append(showNetwork$);
        showArticle$.append(showStatus$);

        var showSummary$ = $('<h3 class="column">').text("Summary: " + omdbResponse.Plot);
        showArticle$.append(showSummary$);

        $("#favorite-show-list").append(showArticle$);
    })
}    

function tvMazeCall(showName) {
        // Code for tvmaze
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://tvjan-tvmaze-v1.p.rapidapi.com/search/shows?q=" + showName,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "c512c6b591msh8548065ce9a6bcap1652ffjsn76f2499113d2",
                "x-rapidapi-host": "tvjan-tvmaze-v1.p.rapidapi.com"
            }
        };
    
        return $.ajax(settings)
}

function omdbCall(showName) {
    var queryURL = "https://www.omdbapi.com/?t=" + showName + "&apikey=trilogy";

   return  $.ajax({
        url: queryURL,
        method: "GET"
    })
}

/// this is for Bulma NavBar Functionality ///

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });