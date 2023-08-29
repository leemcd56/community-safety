const { Events } = require('discord.js')
const addBan = require('../helpers/addBan.js')

module.exports = {
    name: Events.GuildBanAdd,
    once: true,
    async execute(ban) {
        try {
            await addBan(ban.guild, ban.user)
        } catch (error) {
            console.error('[guildBanAdd] An unexpected error occurred: ', error)
        }
    }
}
