const prefix = "~";
client.on("message", (message) => {
  // our new check:
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  // [rest of the code]
});
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

module.exports.run = async (client, message, args) => {
  const { MessageEmbed } = require('discord.js');
  const fs = require('fs');
  const admin = [];
  const adminconf = [];
  const games = [];
  const utility = [];
  const moderator = [];
  const modfun = [];
  for (let i in client.commands.array()) {
      const arrayed = client.commands.array();
      if (!arrayed[i].help.cat) continue;
      switch (arrayed[i].help.cat.toLowerCase()) {
          case 'administrator':{
              admin.push(`$${arrayed[i].help.name.toLowerCase()} - ${arrayed[i].help.description}`);
          };
          case 'admin-conf':{
              adminconf.push(`$${arrayed[i].help.name.toLowerCase()} - ${arrayed[i].help.description}`);
          };
          case 'games':{
              games.push(`$${arrayed[i].help.name.toLowerCase()} - ${arrayed[i].help.description}`);
          };
          case 'utility':{
              utility.push(`$${arrayed[i].help.name.toLowerCase()} - ${arrayed[i].help.description}`);
          };
          case 'moderator':{
              moderator.push(`$${arrayed[i].help.name.toLowerCase()} - ${arrayed[i].help.description}`);
          };
          case 'mod-fun':{
              modfun.push(`$${arrayed[i].help.name.toLowerCase()} - ${arrayed[i].help.description}`);
          };
      };
  };
  if (args[0]) {
      let cmd = args[0].toLowerCase();
      if (!client.commands.has(cmd) && !client.aliases.has(cmd)) {
          message.delete();
          return message.channel.send('Invalid command.');
      };
      if (client.commands.has(cmd)) cmd = client.commands.get(cmd);
      if (client.aliases.has(cmd)) cmd = client.commands.get(client.aliases.get(cmd));
      const embed = new MessageEmbed()
          .setColor('BLUE')
          .setAuthor(`Command - $${cmd.help.name}`, client.user.avatarURL())
          .addField('Description', cmd.help.description)
          .addField('Alias(es)', cmd.help.aliases.length > 0 ? cmd.aliases.join(' ') : 'None')
          .addField('Parameters', cmd.help.paremeters ? cmd.help.parameters : 'None')
      return message.channel.send(embed);
  };
  /*
  if (!message.member.permissions.has('KICK_MEMBERS')) {
      const embed = new MessageEmbed()
          .setColor('BLUE')
          .setAuthor('Utilidex Commands', client.user.avatarURL())
          .addField('Help / Utility', utility.join('\n'))
          .addField('Games', games.join('\n'))
      return message.channel.send(embed);
  };
  if (message.member.permissions.has('KICK_MEMBERS') && !message.member.permissions.has('ADMINISTRATOR')) {
      const embed = new MessageEmbed()
      .setColor('BLUE')
      .setAuthor('Utilidex Commands', client.user.avatarURL())
      .addField('Help / Utility', utility.join('\n'))
      .addField('Games', games.join('\n'))
      .addField('Moderator', moderator.join('\n'))
      .addField('Moderator-Fun', modfun.join('\n'))
  return message.channel.send(embed);
  };*/
  if (message.member.permissions.has('ADMINISTRATOR')) {
      console.log(utility);
      const embed = new MessageEmbed()
      .setColor('BLUE')
      .setAuthor('Utilidex Commands', client.user.avatarURL())
      .addField('Help / Utility', utility.join('\n'))
      .addField('Games', games.join('\n'))
      .addField('Moderator', moderator.join('\n'))
      //.addField('Moderator-Fun', modfun.join('\n'))
      .addField('Administrator', admin.join('\n'))
  return message.channel.send(embed);
  };
};

module.exports.conf = {
  enabled: true,
  reason: null,
  perms: {
      user: 'SEND_MESSAGES',
      bot: 'SEND_MESSAGES'
  }
};

module.exports.help = {
  name: 'Help',
  description: 'Displays a list of all commands or help for a specific command.',
  usage: '$help [commandName]',
  parameters: 'stringCommandName',
  aliases: [],
  cat: 'Utility'
};