const { Events, PermissionsBitField } = require('discord.js')
const checkBans = require('../helpers/checkBans.js')
const channelTypes = require('../helpers/channelTypes.js')

module.exports = {
    name: Events.GuildAvailable,
    once: true,
    async execute(guild) {
        try {
            const bannedMembers = await checkBans(guild)
            const systemChannelId = guild.systemChannelId

            console.log(`Found ${bannedMembers.length} banned members in ${guild.id}`)

            if (systemChannelId && bannedMembers.length > 0) {
                const systemChannel = await guild.channels.cache.get(guild.systemChannelId)

                console.log(`System channel ID: ${systemChannelId}`)
                console.log(`System channel type: ${systemChannel.type}`)

                //if (systemChannel.type === channelTypes.GUILD_TEXT && systemChannel.permissionsFor(guild.me)?.has(PermissionsBitField.Flags.SendMessages)) {
                    bannedMembers.forEach((bannedMember) => {
                        systemChannel.send({
                            content: `<@${bannedMember}>, who is in your server, has been banned in another server.`,
                        })
                    })
                //}
            }
        } catch (error) {
            console.error('[guildCreate] An unexpected error occurred: ', error)
        }
    }
}
