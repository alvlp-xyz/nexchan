const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user from the server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to kick')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if (!user) return interaction.reply('User not found.');

        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            return interaction.reply('You do not have permission to kick members.');
        }

        try {
            await interaction.guild.members.kick(user);
            interaction.reply(`Successfully kicked ${user.tag}`);
        } catch (error) {
            console.error(error);
            interaction.reply('An error occurred while trying to kick the user.');
        }
    },
};
