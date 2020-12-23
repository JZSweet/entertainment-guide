$("#find-movie").on("click", function(event) {
    event.preventDefault();

    // Empties span classes so only one show will display ata a time
    $(".show-name").empty();
    $(".show-day").empty();
    $(".show-time").empty();
    $(".show-network").empty();
    $(".show-summary").empty();
    $(".show-image").empty();
    $(".new-checkbox").empty();
    $(".buttons-div").empty();
    // This line of code will grab the input from the textbox
    var showName = $("#name-input").val().trim();

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

    // Ajax for tvmaze
    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response[0].show.name)

        $(".show-name").text(response[0].show.name);

        $(".show-day").text(response[0].show.schedule.days);

        $(".show-time").text(response[0].show.schedule.time);

        if (response[0].show.network === null) {
            $(".show-status").text("This show is not playing on TV.");
        } else {
            $(".show-status").text("This show is playing on TV.");
            $(".show-network").text(response[0].show.network.name);
        }

    });

    // Code for OMDB
    var queryURL = "https://www.omdbapi.com/?t=" + showName + "&apikey=trilogy";

    // Ajax for OMDB
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)

        var newImg = $("<img>")
        $(newImg).attr("src", response.Poster);
        $(".show-image").append(newImg);

        $(".show-summary").text(response.Plot);
    });

    // Creates a save button
    var saveBtn = $('<button>');
    $(saveBtn).addClass('save-button');
    saveBtn.text("Add " + showName + " to saved shows");
    $('.buttons-div').append(saveBtn);
    // Makes button start out hidden
    $('.save-button').hide();

    // Creates an unsave button
    var unsaveBtn = $('<button>');
    $(unsaveBtn).addClass('unsave-button');
    unsaveBtn.text("Remove " + showName + " from saved shows");
    $('.buttons-div').append(unsaveBtn);
    $('.unsave-button').hide();

    // Retrieves items from local storage
    var storedShows = localStorage.getItem("save-shows");
    storedShows = JSON.parse(storedShows);
    console.log(storedShows)

    // Checks to see if the show is already in local storage
    // If the show is not in local storage, the save button appears
    // If it is in local storage, the remove button appears
    if ($.inArray(showName, storedShows) !== -1) {
        $('.unsave-button').show();
    } else {
        $('.save-button').show();
    }

    // Save button event listener
    $(".save-button").on("click", function(event) {
        event.preventDefault();
        console.log("pressed save")

        // Creates an array to hold saved shows unless an array has already been made
        var saveShows = JSON.parse(localStorage.getItem("save-shows")) || [];
        // Pushes the name of the show currently being looked at to the array
        saveShows.push(showName);
        console.log(saveShows)
        // Saves the array to local storage
        localStorage.setItem("save-shows", JSON.stringify(saveShows));
        $('.unsave-button').show();
        $('.save-button').hide();
    });

    // Unsave button event listener
    $(".unsave-button").on("click", function(event) {
        event.preventDefault();
        console.log("Pressed unsave")

        // Retrieves saved shows from local storage
        var storedShows = localStorage.getItem("save-shows");
        storedShows = JSON.parse(storedShows);
        console.log(storedShows)
        console.log(storedShows.length)

        var index = storedShows.indexOf(showName);
        if (index > -1) {
            storedShows.splice(index, 1);
            console.log(storedShows)
        }

        // Saves new array to local storage
        localStorage.setItem("save-shows", JSON.stringify(storedShows));

        $('.unsave-button').hide();
        $('.save-button').show();
    });
});

// Placeholder for clearing local storage
$("#clear-shows").on("click", function(){
    console.log("clicked clear shows")
    localStorage.clear("save-shows");
    storedShows = [];
})