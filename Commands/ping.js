const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

if(command === 'ping') {
    message.channel.send('Pong!');
  } else
  if (command === 'blah') {
    message.channel.send('Meh.');
  }