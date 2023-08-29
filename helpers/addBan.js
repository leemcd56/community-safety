const { sql } = require('@vercel/postgres')

module.exports = async function (guild, ban) {
    try {
        const guid = ban.user.id
        const reason = ban.reason.length > 0 ? ban.reason : 'No reason provided'

        const result = sql`INSERT INTO bans (guid, reason) VALUES (${guid}, ${reason});`
    } catch (error) {
        console.error(`An error occurred while trying to add a ban`)
    }
}
