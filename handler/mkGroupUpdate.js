/**
 * when the group is updated
 * on (event: 'group-update', listener: (update: Partial<WAGroupMetadata> & {jid: string, actor?: string}) => void): this
 */
const groupUpdate = ({ db, share, connWA, connWS }) => async (user) => {
}

module.exports = groupUpdate
