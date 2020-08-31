# leaderboard-system-js
A leaderboard server in javascript
all data about users on the leaderboard is stored in a json file.
You get the json by creating a GET request
You can add users to the leaderboard by creating a POST request, for example `{"user":"test","score":10}`, but it must be encoded to base64
The server sorts the users by their score.
