// events/welcome.js
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(member) {
        const guild = member.guild;
        const channel = guild.channels.cache.find(ch => ch.name === 'welcome'); // Find the channel where you want to send welcome messages
        if (!channel) return; // If the channel is not found, do nothing

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Welcome to ${guild.name}!`)
            .setDescription(`Welcome, ${member}! We're glad to have you with us.`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        channel.send({ embeds: [embed] });
    },
};
