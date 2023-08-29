const { sql } = require('@vercel/postgres')

module.exports = async function (guild) {
    const limit = 20
    let offset = 0
    let results = { rowCount: 0 }
    let pendingNotifiedBans = []

    try {
        do {
            results = await sql`SELECT guid FROM bans ORDER BY guid LIMIT ${limit} OFFSET ${offset};`

            if (results.rows?.length === 0) {
                break;
            }

            const bannedMembers = results.rows.map((bannedMember) => bannedMember.guid)

            console.log(`Checking ${bannedMembers.length} banned members against guild ${guild.id}`)

            guild.members.fetch({ user: bannedMembers })
                .then((pending) => {
                    console.log(`Found ${pending.size} banned members on this round`)

                    for (const [key, member] of pending.entries()) {
                        pendingNotifiedBans.push(member.user.id)
                    }
                })
                .catch(console.error)

            offset += limit
        } while (results.rowCount !== null)
    } catch (error) {
        console.error(`An error occurred while trying to fetch members from ${guild.id}`, error)
    }

    return pendingNotifiedBans
}
