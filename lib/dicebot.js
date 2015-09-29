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
        this._isMentioningDiceBot(message)
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

DiceBot.prototype._replyWithDice = function (originalMessage) {
    var self = this;
    // regex for die roll
    var regex = /(\d+)?(\s)?d(\s)?(\d+)(\s)?([+-])?(\s)?(\d+)?/;
    var matching = regex.exec(originalMessage);

    var value = 0;
    var sides = 1;

    // gets the number of dice, or 1
    var numberOfDice = NaN(matching.split('d')[0].trim()) ? 1 : matching.split('d')[0].trim();

    // gets the number to the right of the '+'
    var splitOnPlus = NaN(matching.split('+')[1].trim()) ? 0 : numbers[1].trim();

    // gets the number to the right of the '-'
    var splitOnMinus = NaN(matching.split('-')[1].trim()) ? 0 : numbers[1].trim();

    // gets the number of sides, and adds the bonus (if any)
    if (splitOnPlus > 0) {
        sides = matching.split('+')[0].trim();
        value += splitOnPlus;
    } else if (splitOnMinus > 0) {
        sides = matching.split('+')[0].trim();
        value += splitOnMinus;
    } else {
        sides = matching.split('d')[1].trim()
    }

    var channel = self._getChannelById(originalMessage.channel);
    for (var i = 0; i < numberOfDice; i++) {
        value += self._getRandomInt(1, sides);
    }

    self.postMessageToChannel(channel.name, matching.trim() + ': ' + value.toString(), {as_user: true}, null);
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
