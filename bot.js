var irc = require('irc');
var fs = require('fs');

var configFile = 'config.json';
var passwordOP = 'koko12';

var config =  JSON.parse(fs.readFileSync(configFile));

var bot = new irc.Client(config.server, config.name, {
    channels: config.channels,
    autoRejoin: config.autoRejoin,
    autoConnect: config.autoConnect,
    userName: config.name,
    realName: config.realName
});
bot.addListener('join', function (channel, who) {
    if (who === bot.opt.nick) {
        console.log('Bot connected');
    } else {
        console.log('User: %s joined the chanel: %s', who, channel);
        bot.say(channel, 'Welcome ' + who);
    }
});

// PM event handler
bot.addListener('pm', function (from, message) {
    console.log(from + ' said: ' + message);
    if (message === passwordOP) {
        bot.say(from, 'WOW you guessed password for OP');
    }
}) ;

// Message handler
bot.addListener('message', function (from, to ,text, message) {
    if (text.indexOf('kurwa') > -1) {
        bot.say(from, 'Private?');
        console.log('przeklenstwo "%s" od: %s', text, from);
    }
});

// Kick handler
bot.addListener('kick', function (channel, who, by, reason) {
    console.log('%s was kicked because "%s" by s.', who, reason, by);
});

// Leave handler
bot.addListener('part', function (channel, who, reason) {
    console.log('%s has left because "%s"', who, reason);
});
