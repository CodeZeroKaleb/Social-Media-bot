
module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;
  
    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;
  
    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
  
    // Run the command
    cmd.run(client, message, args);
  };
{
    if (!args[0]) return client.execHelp(message, 'ban');
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return client.execHelp(message, 'ban');
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) {
        message.delete();
        return message.channel.send('**You cannot moderate a user with an equal or higher role than you.**');
    };
    if (member.user.id === message.author.id) {
        message.delete();
        return message.channel.send('**You cannot moderate yourself.**');
    };
    if (member.user.id === message.guild.owner.id) {
        message.delete();
        return message.channel.send('**You cannot moderate the server owner.**');
    };
    const reason = args.slice(1).join(' ');
    if (!reason || reason.length < 1) return client.execHelp(message, 'ban');
    await message.delete();
    const userDM = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setDescription(`You have been banned from **${message.guild.name}** by ${message.author.tag}`)
        .addField('Reason', reason)
        .setColor('RED')
        .setThumbnail('https://tinyurl.com/bantriangle')
    try {
        await member.send(userDM);
    } catch (e) {
        console.log(e);
    };
    const channelEmbed = new MessageEmbed()
        .setThumbnail('https://vignette.wikia.nocookie.net/pufflescp/images/6/68/Red_Warning_Triangle.png/revision/latest?cb=20160718024653')
        .setAuthor(message.author.username, message.author.avatarURL())
        .setTitle('User Banned')
        .setDescription(`**${member.user.username}** has been banned by ${message.author.username}`)
        .addField('Reason', reason)
        .setColor('RED')
    try {
        await member.ban({ reason: `Banned by ${message.author.tag} for ${reason}` });
    } catch (e) {
        return message.channel.send(`:no_entry: **Command failed: ${e.message}**`);
    };
    const time = moment().format('MMMM Do YYYY, h:mm:ss a');
    const current = client.modCases.get(message.guild.id);
    const caseNum = client.modCases.get(message.guild.id).length + 1;
    current.push({
        case: caseNum,
        user: member.user.tag,
        moderator: message.author.tag,
        type: "ban",
        time: time
    });
    client.modCases.set(message.guild.id, current);
    if (!client.userModCases.has(member.user.id)) {
        await client.userModCases.set(member.user.id, []);
    };
    const userCases = client.userModCases.get(member.user.id);
    console.log(client.userModCases.get(member.user.id));
    userCases.push({
        case: caseNum,
        user: member.user.tag,
        moderator: message.author.tag,
        type: "ban",
        time: time
    });
    client.userModCases.set(member.user.id, userCases);
    message.channel.send(member.user, channelEmbed);
    if (!client.settings.get(message.guild.id).logging.modlog.enabled || !message.guild.channels.cache.get(client.settings.get(message.guild.id).logging.modlog.id)) return;
    let channel = message.guild.channels.cache.get(client.settings.get(message.guild.id).logging.modlog.id);  
    const logEmbed = new MessageEmbed()
        .setAuthor(`${member.user.tag} | Ban`, member.user.avatarURL())
        .setDescription(`**${member.user.tag}** (\`${member.user.id}\`) was banned by ${message.author.tag}`)
        .addField('Reason', reason)
        .setFooter(`Case #${caseNum} | ${time}`)
        .setColor('RED')
    return channel.send(logEmbed);
};

module.exports.conf = {
    enabled: true,
    reason: null,
    perms:{
        user:'BAN_MEMBERS',
        bot:'BAN_MEMBERS'
    }
};

module.exports.help = {
    name: 'Ban', 
    description: 'Bans a member from the server.',
    usage: '$ban <@user|user ID> <reason>',
    aliases: ['permban', 'pban'],
    parameters: 'snowflakeGuildMember, stringReason',
    cat: 'Administrator'
};