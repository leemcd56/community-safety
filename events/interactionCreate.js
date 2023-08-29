const { Events } = require('discord.js')

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute(interaction) {
        if (! interaction.isChatInputCommand()) return

        const { commandName } = interaction

        if (commandName === 'stats') {
            return interaction.reply(`Server count: ${client.guilds.cache.size}`)
        }
    }
}
