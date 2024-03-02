const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setverify')
        .setDescription('Set up verification')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The verification role')
                .setRequired(true)),

    async execute(interaction) {
        try {
            const role = interaction.options.getRole('role');
            
            // Validate role
            if (!role) {
                return await interaction.reply({
                    content: 'Invalid role specified.',
                    ephemeral: true
                });
            }

            const confirm = new ButtonBuilder()
                .setCustomId('verify')
                .setLabel('Verify')
                .setStyle(ButtonStyle.Success);
            
            const row = new ActionRowBuilder()
                .addComponents(confirm);
            
            await interaction.reply({
                content: 'Click the button below to verify yourself:',
                components: [row]
            });
        } catch (error) {
            console.error('Error setting up verification:', error);
            await interaction.reply({
                content: 'An error occurred while setting up verification.',
                ephemeral: true
            });
        }
    }
};
