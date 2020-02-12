console.log("Keys loaded");

//Get spotify api credentials by following these steps:
//Step 1 Visit - https://developer.spotify.com/my-applications/#!/
//Step 2 Either login to your existing spotify acct or create a new one.
//Step 3 Once logged in go to https://developer.spotify.com/my-applications/#!/applications/create to register a new application with spotify api. Fill in whatever you like for these fields. Click complete when finished.
//Step 4 On the next screen scroll down to see your client id and client secret. Copy these below, you will need them for the spotify api and node spotify api package.

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};
