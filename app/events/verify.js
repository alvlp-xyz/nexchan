const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        try {
            // Check if the interaction is a button interaction
            if (!interaction.isButton()) return;

            // Check if the custom ID of the button is 'verify'
            if (interaction.customId !== 'verify') return;

            // Handle verification process
            const member = interaction.member;

            // Check if the user is already verified
            if (member.roles.cache.some(role => role.name === 'client')) {
                await interaction.reply('You are already verified!');
            } else {
                // Assign the verified role to the user
                const role = interaction.guild.roles.cache.find(role => role.name === 'client');
                if (role) {
                    await member.roles.add(role);
                    await interaction.reply('You have been verified!');
                } else {
                    await interaction.reply('Error: Verified role not found.');
                }
            }
        } catch (error) {
            console.error('Error during verification:', error);
            await interaction.reply('An error occurred during verification.');
        }
    }
};
