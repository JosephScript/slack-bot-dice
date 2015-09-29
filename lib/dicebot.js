var Bot = require('slackbots');
var util = require('util');

// constructor
var DiceBot = function Constructor(params) {
    this.params = params;
    this.params.name = params.name || 'dice';
};

// inherits methods and properties from the Bot constructor
util.inherits(DiceBot, Bot);

DiceBot.prototype.run = function () {
    DiceBot.super_.call(this, this.params);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

DiceBot.prototype._onStart = function () {
    this._loadBotUser();
    this._firstRunCheck();
};

DiceBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

DiceBot.prototype._firstRunCheck = function () {

    this._welcomeMessage();
};

DiceBot.prototype._welcomeMessage = function () {
    this.postMessageToChannel(this.channels[0].name, 'Shall we play a game?' +
        '\n I can roll the dice. Just say `roll` or `' + this.name + '` to invoke me!',
        {as_user: true}, null);
};

DiceBot.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message) && !this._isFromDiceBot(message) &&
        this._isMentioningDiceBot(message) && this._isADieRoll(message)
    ) {
        this._replyWithDice(message);
    }
};

DiceBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

DiceBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
};

DiceBot.prototype._isFromDiceBot = function (message) {
    return message.user === this.user.id;
};

DiceBot.prototype._isMentioningDiceBot = function (message) {
    return message.text.toLowerCase().indexOf('roll') > -1 ||
        message.text.toLowerCase().indexOf(this.name) > -1;
};

DiceBot.prototype._isADieRoll = function (message) {
    try {
        var regex = /(\d+)?(\s)?d(\s)?(\d+)(\s)?([+-])?(\s)?(\d+)?/;
        var matching = regex.exec(message.text);
        return matching && matching.length > 0;
    } catch (err) {
        console.log(err)
    }
    return false;
};

DiceBot.prototype._replyWithDice = function (originalMessage) {

    var channel = this._getChannelById(originalMessage.channel);
    try {
        console.log('Replying to message:', originalMessage.text);
        var self = this;
        // regex for die roll
        var regex = /(\d+)?(\s)?d(\s)?(\d+)(\s)?([+-])?(\s)?(\d+)?/;
        var matching = regex.exec(originalMessage.text);
        if (matching && matching.length > 0) {
            matching = matching[0].trim();
            console.log(matching);

            var value = 0;
            var sides = 1;

            // gets the number of dice, or 1
            var numberOfDice = matching.split('d')[0].length > 0 && !isNaN(matching.split('d')[0].trim()) ? Number(matching.split('d')[0].trim()) : 1;

            // gets the number to the right of the '+'
            var splitOnPlus = matching.split('+').length > 1 && !isNaN(matching.split('+')[1].trim()) ? Number(matching.split('+')[1].trim()) : 0;

            // gets the number to the right of the '-'
            var splitOnMinus = matching.split('-').length > 1 && !isNaN(matching.split('-')[1].trim()) ? Number(matching.split('-')[1].trim()) : 0;


            // gets the number of sides, and adds the bonus (if any)
            if (splitOnPlus > 0) {
                sides = Number(matching.split('d')[1].split('+')[0].trim()); // number between 'd' and '+'
                value += splitOnPlus;
            } else if (splitOnMinus > 0) {
                sides = Number(matching.split('d')[1].split('-')[0].trim()); // number between 'd' and '-'
                value -= splitOnMinus;
            } else {
                sides = Number(matching.split('d')[1].trim()); // number after 'd'
            }

            console.log('Split on plus:', splitOnPlus);
            console.log('Split on minus:', splitOnMinus);
            console.log('Number of sides:', sides);
            console.log('Number of dice:', numberOfDice);

            for (var i = 0; i < numberOfDice; i++) {
                value += self._getRandomInt(1, sides);
            }

            self.postMessageToChannel(channel.name, matching.trim() + ': ' + value.toString(), {as_user: true}, null);
        }
    } catch (err) {
        console.log(err);
        this.postMessageToChannel(channel.name, 'Oops I encountered an error. I logged it an my human will look into this.', {as_user: true}, null);
    }
};

DiceBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

DiceBot.prototype._getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


module.exports = DiceBot;
