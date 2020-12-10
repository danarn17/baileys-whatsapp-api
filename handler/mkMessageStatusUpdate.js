/**
 * when a message's status is updated (deleted, delivered, read, sent etc.)
 * on (event: 'message-status-update', listener: (message: WAMessageStatusUpdate) => void): this
 */
const messageStatusUpdate = ({ db, share, connWA, connWS }) => async (message) => {
}

module.exports = messageStatusUpdate
