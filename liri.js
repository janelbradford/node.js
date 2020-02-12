//Dependencies
//Read and set environment variables
require("dotenv").config();

//Import the node-spotify-api NPM package
var Spotify = require("node-spotify-api");

//Import the Api keys
var keys = require("./keys");

//Import the axios npm package 
var axios = require("axios");

//Import the moment npm package
var moment = require("moment");

//Import the FS package for read and write
var fs = require("fs");

//Initialize the spotify Api client using out client ID and secret
var spotify = new Spotify(keys.spotify);

//////// FUNCTIONS!!!

//Helper function that gets the artist name
var getArtistNames = function (artist) {
    return artist.name;
};

//Function for running a spotify search
var getMeSpotify = function (songName) {
    if (songName === undefined) {
        songName = "Whats my age again?";
    }

    spotify.search(
        {
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log("Error occured: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("---------------");
            }
        }
    );
};

var getMyBands = function (artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(queryURL).then(
        function (response) {
            var jsonData = response.data;

            if (!jsonData.length) {
                console.log("No results found for " + artist);
                return;
            }

            console.log("Upcoming concerts for " + artist + ":");

            for (var i = 0; i < jsonData.length; i++) {
                var show = jsonData[i];

                //Print data for each concert
                //If a concert doesnt have a region, display the country instead
                //Use moment to format the date
                console.log(
                    show.venue.city +
                    "," +
                    (show.venue.region || show.venue.country) +
                    " at " +
                    show.venue.name +
                    " " +
                    moment(show.datetime).format("MM/DD/YYYY")
                );
            }
        }
    );
};

//Function for running a Movie Search
var getMeMovie = function (movieName) {
    if (movieName === undefined) {
        movieName = "Mr Nobody";
    }

    var urlHit =
        "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy"

    axios.get(urlHit).then(
        function (response) {
            var jsonData = response.data;

            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("Rated: " + jsonData.Rated);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            console.log("Rotten Tomatoes Rating: " + jsonDataRatings[1].Value);
        }
    );
};

//Function fo4r running a command based on text file
var doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        console.log(data);

        var dataArr = data.split(",");

        if (dataArr.length === 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
            pick(dataArr[0]);
        }
    });
};

//Function for determining which command is executed
var pick = function (caseData, functionData) {
    switch (caseData) {
        case "concert-this":
            getMyBands(functionData);
            break;
        case "spotify-this-song":
            getMeSpotify(functionData);
            break;
        case "movie-this":
            getMeMovie(functionData);
            break;
        case "do-what-it-says":
            break;
        default:
            console.log("Liri doesn't know that");
    }
};

//Function which takes in command line arguments and exedutes correct function accordingly
var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);
};

//Main process
runThis(process.argv[2], process.argv.slice(3).join(" "));