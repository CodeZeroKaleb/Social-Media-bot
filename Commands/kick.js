const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();