$("#search-movie").on("click", function(event) {
    event.preventDefault();

    $("#movies-view").empty();
    // This line of code will grab the input from the textbox
    var showName = $("#movie-input").val().trim();

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

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response[0].show.name)

        var showDiv = $('<div>');
        var showInfo = (response[0].show.name)
        var newEl = $("<p>")
        $(newEl).text(showInfo);
        $(showDiv).append(newEl);
        $("#movies-view").append(showDiv);

        var showInfo = (response[0].show.schedule.days)
        var newEl = $("<p>")
        $(newEl).text(showInfo);
        $(showDiv).append(newEl);
        $("#movies-view").append(showDiv);

        var showInfo = (response[0].show.schedule.time)
        var newEl = $("<p>")
        $(newEl).text(showInfo);
        $(showDiv).append(newEl);
        $("#movies-view").append(showDiv);

        var showInfo = (response[0].show.network.name)
        var newEl = $("<p>")
        $(newEl).text("Network: " + showInfo);
        $(showDiv).append(newEl);
        $("#movies-view").append(showDiv);
    });

    var queryURL = "https://www.omdbapi.com/?t=" + showName + "&apikey=trilogy";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        // Creates an element to hold the image
        var showDiv = $('<div>');
        var newImg = $("<img>")
        $(newImg).attr("src", response.Poster);
        // Appends the image
        $(showDiv).append(newImg);

        var showInfo = (response.Plot)
        var newEl = $("<p>")
        $(newEl).text("Plot: " + showInfo);
        $(showDiv).append(newEl);
        // Puts the entire Movie above the previous movies.
        $("#movies-view").prepend(showDiv);
    });

});