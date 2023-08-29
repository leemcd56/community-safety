const { Events } = require('discord.js')
const checkBans = require('../helpers/checkBans.js')

module.exports = {
    name: Events.GuildAvailable,
    once: true,
    async execute(guild) {
        try {
            const bannedMembers = await checkBans(guild)
            const systemChannel = guild.systemChannelId

            console.log(`Found ${bannedMembers.length} banned members in ${guild.id}`, bannedMembers)

            bannedMembers.forEach((bannedMember) => {
                guild.channels.cache.fetch(systemChannel)
                    .then((channel) => {
                        if (channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
                            channel.send({
                                content: `<@${bannedMember}>, who is in your server, has been banned in another server.`,
                            })
                        }
                    })
                    .catch(console.error)
            })
        } catch (error) {
            console.error('[guildCreate] An unexpected error occurred: ', error)
        }
    }
}
