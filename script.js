$("#find-movie").on("click", function(event) {
    event.preventDefault();

    // Empties span classes so only one show will display ata a time
    $(".show-name").empty();
    $(".show-day").empty();
    $(".show-time").empty();
    $(".show-network").empty();
    $(".show-summary").empty();
    $(".show-image").empty();
    // This line of code will grab the input from the textbox
    var showName = $("#name-input").val().trim();

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

    var queryURL = "https://www.omdbapi.com/?t=" + showName + "&apikey=trilogy";

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

});