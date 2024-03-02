// events/goodbye.js
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    once: false,
    execute(member) {
        const guild = member.guild;
        const channel = guild.channels.cache.find(ch => ch.name === 'goodbye'); // Find the channel where you want to send goodbye messages
        if (!channel) return; // If the channel is not found, do nothing

        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Goodbye!')
            .setDescription(`Goodbye, ${member.user.tag}. We'll miss you!`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        channel.send({ embeds: [embed] });
    },
};
