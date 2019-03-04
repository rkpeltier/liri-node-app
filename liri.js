require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api'); //Capital Spotify requiring node-spotify
var spotify = new Spotify(keys.spotify); //lower case spotify get spotify keys
var moment = require('moment');
var axios = require("axios");
var action = process.argv[2];
var input = process.argv.slice(3).join(" ");
var fs = require("fs");

switch (action) {
    case "concert-this":
      concertThis();
      break;
    
    case "spotify-this-song":
      spotifyThis();
      break;
    
    case "movie-this":
      movieThis();
      break;
    
    case "do-what-it-says":
      doWhatItSays();
      break;
    }

//Concert This Function is a work in progress
function concertThis() {
  var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
  axios.get(queryUrl).then(function(resp){
    for (var i = 0; i < resp.data.length; i++) {
      var bands = resp.data[i];
      console.log("Venue Name " + bands.venue.name);
      console.log("Location: " + bands.venue.city);
      console.log("Date: " + moment(bands.datetime).format("MM/DD/YYYY"));
    }; //Need to handle error
  });
};

//Spotify This Function
function spotifyThis() {
  spotify.search({ type: 'track', query: input, limit: 1}, function(error, data){
    if(!error){
    for(var i = 0; i < data.tracks.items.length; i++){
        var spotifyData = data.tracks.items[i];
        console.log("Artist: " + spotifyData.artists[0].name);
        console.log("Song: " + spotifyData.name);
        console.log("Album: " + spotifyData.album.name);
        console.log("Preview URL: " + spotifyData.preview_url);
        } 
    } else {
    console.log(error);
    }
});
};

//Need to work out how to handle spotify error

// function spotifyThisError() {
//   spotify.search({ type: 'track', query: input, limit: 1}, function(error, data){
//     if(!error){
//     for(var i = 0; i < data.tracks.items.length; i++){
//         var spotifyData = data.tracks.items[i];
//             console.log("Artist: " + spotifyData.artists[0].name);
//             console.log("Song: " + spotifyData.name);
//             console.log("Album: " + spotifyData.album.name);
//             console.log("Preview URL: " + spotifyData.preview_url);
//         } 
//     } else {
//     console.log(error);
//     }
//     fs.writeFile("random.txt", spotifyData, function(err){
//       if(err) {
//         console.log(error);
//       }
//     })
// });
// };

//Movie this Function
function movieThis() {
  var url = 'https://omdbapi.com/?t=' + input + '&apikey=trilogy'
  axios.get(url).then(function(resp){
    for (var i = 0; i < resp.length; i++){
      if(resp.title !== undefined) {
        console.log("Movie Title: " + resp.title);
        console.log("Year: " + resp.year);
        console.log("IMDB Rating: " + resp.imdbRating);
        console.log("Language: " + resp.language);
        console.log("Plot: " + resp.plot);
        console.log("Actors: " + resp.actors);
      } else {
        movieThisError();
      };
  };
  });
};

function movieThisError() {
  var url = 'https://omdbapi.com/?t=mr+nobody&apikey=trilogy' //adding movie Mr. Nobody to url
  axios.get(url).then(function(resp){
      console.log("Movie Title: " + resp.title);
      console.log("Year: " + resp.year);
      console.log("IMDB Rating: " + resp.imdbRating);
      console.log("Language: " + resp.language);
      console.log("Plot: " + resp.plot);
      console.log("Actors: " + resp.actors);
  });
};


//Do it function
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    if (error) {
      return console.log(error);
    }
});
}