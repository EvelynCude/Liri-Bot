//  Incorporate packages and files
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var Spotify = require("spotify");
var Twitter = require("twitter");
var fs = require("fs");



//var spotify = new Spotify(keys.spotify);
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
//  Liri can take four commands.  Determing which command was used:
//  my-tweets
if (liriCommand === "my-tweets"){
    showTweets();

//  node liri.js my-tweets
//  This will show your last 20 tweets and when they were created at in your terminal / bash window.
function showTweets() {
    //  Retrieve the last 20 tweets
    var params = {screen_name: 'EvelynCude', count: 20};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        // console log tweets (pretty)
        if (!error){
            var tweetList = 
            '\n------------------------------------------------------------------------------------\n\n' 
            + 'Last 20 Tweets:\n\n' + 
            '------------------------------------------------------------------------------------\n';

            for (var i = 0; i < tweets.length; i++) {
                tweetList += 'Tweeted on: ' + tweets[i].created_at + '\n' +
                    'Tweet: ' + tweets[i].text + '\n' +
                    'Retweet Count: ' + tweets[i].retweet_count + '\n' +
                    'Favorite Count: ' + tweets[i].favorite_count + '\n' +
                    '--------------------------------------------\n';
            }
            console.log(tweetList);
        }
    });
}









// Then run a request to the OMDB API with the movie specified
// request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function (error, response, body) {

//     // If the request is successful (i.e. if the response status code is 200)
//     if (!error && response.statusCode === 200) {

//         // Parse the body of the site and recover just the imdbRating
//         // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//         console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
//     }
 };