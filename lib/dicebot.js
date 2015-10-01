var Bot = require('slackbots');
var util = require('util');
var dice = require('./dice');

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
        '\n I can roll the dice. Just say `roll nDX+y` to invoke me! `n` is the number of dice, `X` is the die value, and `y` is the number you want to add to the result. To add a negative number, use `roll nDX-y`.',
        {as_user: true}, null);
};

DiceBot.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message) && !this._isFromDiceBot(message) &&
        this._isMentioningDiceBot(message) && dice.isADieRoll(message.text)
    ) {

        this._replyWithDice(message, this._isDetailed(message.text));
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

DiceBot.prototype._isDetailed = function (message) {
    try {
        return message.toLowerCase().indexOf('detail') > -1;
    } catch (err) {
        console.log(err);
        return false;
    }
};

DiceBot.prototype._isMentioningDiceBot = function (message) {
    return message.text.toLowerCase().indexOf('roll') > -1;
};

DiceBot.prototype._replyWithDice = function (originalMessage, logs) {

    var channel = this._getChannelById(originalMessage.channel, logs);
    try {
        var value = dice.roll(originalMessage.text);
        if (logs) {
            this.postMessageToChannel(channel.name, "```" + value.log + "```", {as_user: true}, null);
        } else {
            this.postMessageToChannel(channel.name, "Total: " + value, {as_user: true}, null);
        }
    } catch (err) {
        console.log(err);
        this.postMessageToChannel(channel.name, 'Oops I encountered an error. I logged it and my human will look into this.', {as_user: true}, null);
    }
};

DiceBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};


module.exports = DiceBot;
