require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var firstArg = process.argv[2];
var secondArg = process.argv[3];
var fs = requre("fs");

var queryUrlBand = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

axios.get(queryUrlBand).then(function(response) {
    console.log(response);

    for (var i = 0; i < response.length; i++){

        if (firstArg === "concert-this") {
            //concert this + 2ndArg
        } else if (firstArg === "spotify-this-song") {
            //spofity-this-song + 2ndArg
        } else if (firstArg === "movie-this") {
            //movie-this + 2ndArg
            //
        } else if (firstArg === "do-what-it-says") {
            //do-what-it-says + 2ndArg
            //read text file
            //"I want it that way" via spotify
        }

    };

    




});