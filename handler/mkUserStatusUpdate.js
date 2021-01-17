/**
 * when a user's status is updated
 * on (event: 'user-status-update', listener: (update: {jid: string, status?: string}) => void): this
 */
const userStatusUpdate = ({ db, share, connWA, connWS }) => async (update) => {
}

module.exports = userStatusUpdate
