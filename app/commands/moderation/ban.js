const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to ban')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if (!user) return interaction.reply('User not found.');

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply('You do not have permission to ban members.');
        }

        try {
            await interaction.guild.members.ban(user);
            interaction.reply(`Successfully banned ${user.tag}`);
        } catch (error) {
            console.error(error);
            interaction.reply('An error occurred while trying to ban the user.');
        }
    },
};
