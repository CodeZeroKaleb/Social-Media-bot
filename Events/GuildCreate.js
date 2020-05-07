module.exports = (client, member) => {
    const { MessageEmbed } = require('discord.js');
    const guild = member.guild;
    if (member.roles.cache.has("")) member.roles.remove("");
    member.roles.add("", "New member.");
    const channel = guild.channels.cache.get("");
    if (!channel) return;
    const sendEmbed = new MessageEmbed()
      .setColor('BLUE')
      .setAuthor(guild.name, guild.iconURL())
      .setDescription(`Welcome to **${guild.name}**. Due to recent security issues within the server, you will have to wait until a staff member accepts you into the server. We apologize for any inconveniences.`)
    channel.send(member.user, sendEmbed)
    const staffEmbed = new MessageEmbed()
      .setColor('RED')
      .setAuthor(member.user.tag, member.user.avatarURL())
      .setTitle('New User')
      .setDescription(`Please verify ${member.user} (\`${member.user.id}\`) in <#>`)
    return guild.channels.cache.get("").send("<@>", staffEmbed);
};