// commands/events/goodbye.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setgoodbye')
        .setDescription('Set the channel for goodbye messages')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to set as goodbye channel')
                .setRequired(true)),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const channelId = interaction.options.getChannel('channel').id;
        const filePath = `./database/guilds/database-${guildId}.json`;

        try {
            let guildData = {};
            if (fs.existsSync(filePath)) {
                guildData = JSON.parse(fs.readFileSync(filePath));
            }
            guildData.goodbyeChannel = channelId;
            fs.writeFileSync(filePath, JSON.stringify(guildData, null, 2));
            await interaction.reply(`Goodbye channel set to <#${channelId}>`);
        } catch (error) {
            console.error('Error setting goodbye channel:', error);
            await interaction.reply('An error occurred while setting the goodbye channel.');
        }
    },
};
