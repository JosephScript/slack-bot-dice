var Dicebot = require('../lib/dicebot');
var http = require('http');

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;

var dice = new Dicebot({
    token: token,
    name: name
});

var server = http.createServer(handleRequest);
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}
const PORT= process.env.PORT || 8080;

// Needed to stop heroku from dying
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on port: %s", PORT);
});

dice.run();