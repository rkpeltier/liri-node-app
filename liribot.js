var axios = require("axios");

var queryUrlBand = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

axios.get(queryUrlBand).then(function(response) {
    console.log(response);
})