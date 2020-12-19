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

        var showInfo = (response[0].show.name)
        $(".show-name").text(showInfo);

        var showInfo = (response[0].show.schedule.days)
        $(".show-day").text(showInfo);

        var showInfo = (response[0].show.schedule.time)
        $(".show-time").text(showInfo);

        var showInfo = (response[0].show.network.name)
        $(".show-network").text(showInfo);
    });

    var queryURL = "https://www.omdbapi.com/?t=" + showName + "&apikey=trilogy";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)

        var newImg = $("<img>")
        $(newImg).attr("src", response.Poster);
        // Appends the image
        $(".show-image").append(newImg);

        var showInfo = (response.Plot)
        $(".show-summary").text(showInfo);
    });

});