//  Incorporate packages and files
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


// Store all of the arguments in an array
var nodeArgs = process.argv;
// Create a variable to store the Liri command that was chosen.  
var liriCommand = process.argv[2];
// Create an empty variable for holding the user's search which the user inputs after the Liri command.
var userSearch = "";
// Loop through all the words in the node argument to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        userSearch = userSearch + "+" + nodeArgs[i];
    }
    else {
        userSearch += nodeArgs[i];
    }
}

//  Liri can take four commands.  Determing which command was used and call the matching function:
//  1)  my-tweets
if (liriCommand === "my-tweets"){
    showTweets();
//  2)  spotify-this-song
}else if (liriCommand === "spotify-this-song"){
    showSpotify(userSearch);
//  3)  movie-this
}else if (liriCommand === "movie-this"){
    showOMDB(userSearch);
//  4)  do-what-it-says
}else if (liriCommand === "do-what-it-says"){
    showRandom();
}

//  node liri.js my-tweets
//  This will show your last 20 tweets and when they were created at in your terminal / bash window.
function showTweets() {
    //  Retrieve the last 20 tweets
    var params = {screen_name: 'EvelynCude', count: 20};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        // console log tweets (pretty)
        if (!error){
            var tweetList = 
            "\n------------------------------------------------------------------------------------\n\n" 
            + "Last 20 Tweets:\n\n" + 
            "------------------------------------------------------------------------------------\n";

            for (var i = 0; i < tweets.length; i++) {
                tweetList += "Tweet: " + tweets[i].text + "\n\n" +
                    "Tweeted on: " + tweets[i].created_at + "\n" +
                    "--------------------------------------------\n";
            }
            console.log(tweetList);
        } else if (error) {
            throw error;
        }
    });
}

//  node liri.js spotify-this-song '<song name here>'
//  This will show the following information about the song in your terminal / bash window
//      Artist(s)
//      The song's name
//      A preview link of the song from Spotify
//      The album that the song is from
function showSpotify(userSearch){
    var song;
    if (userSearch === ""){
        song = "The Sign Ace of Base";
    }else {
        song = userSearch;
    }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //console.log(data);
        //console.log(data.tracks.items[0]);

        var songData = data.tracks.items[0];
        var songInfo = 
            "\n----------------------------------------------------------------\n"
            + "Song Information:\n" 
            + "----------------------------------------------------------------\n"
            + "Artist(s): " + songData.artists[0].name + "\n" 
            + "Song Name: " + songData.name + "\n"
            + "Preview Link: " + songData.preview_url + "\n"
            + "Album: " + songData.album.name + "\n"
            + "----------------------------------------------------------------\n";
        console.log(songInfo);
    });
}

// node liri.js movie-this '<movie name here>'
// This will output the following information to your terminal / bash window:
//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.
function showOMDB(userSearch) {
    var movie;
    if (userSearch === "") {
        movie = "Mr. Nobody";
    } else {
        movie = userSearch;
    }
    //  Run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            var movieInfo =
                "\n----------------------------------------------------------------\n"
                + "Movie Information:\n"
                + "----------------------------------------------------------------\n"
                + "Title: " + movieData.Title + "\n"
                + "Release Year: " + movieData.Year + "\n"
                + "IMDB Rating: " + movieData.Ratings[0].Value + "\n"
                + "Rotten Tomatoes Rating: " + movieData.Ratings[1].Value + "\n"
                + "Country where produced: " + movieData.Country + "\n"
                + "Language: " + movieData.Language + "\n"
                + "Plot: " + movieData.Plot + "\n"
                + "Actors: " + movieData.Actors + "\n"
                + "----------------------------------------------------------------\n";
            console.log(movieInfo);
        } else {
           return console.log('Error occurred: ' + error);
        }
    });
}
