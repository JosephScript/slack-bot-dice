var Dicebot = require('../lib/dicebot');

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;

var dice = new Dicebot({
    token: token,
    name: name
});

dice.run();