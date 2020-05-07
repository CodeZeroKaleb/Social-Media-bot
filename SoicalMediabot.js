const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
  
});

client.login("NTk4OTQ3NzU1OTM4OTM4ODk0.XrNUtg.U6O1kIaaChTl13eeg1HyQwtfPzw");
