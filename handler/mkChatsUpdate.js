/**
 * when multiple chats are updated (new message, updated message, deleted, pinned, etc)
 * on (event: 'chats-update', listener: (chats: WAChatUpdate[]) => void): this
 */
const chatsUpdate = ({ db, share, connWA, connWS }) => async (chats) => {
}

module.exports = chatsUpdate
