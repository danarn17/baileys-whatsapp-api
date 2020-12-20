/**
 * when chats are sent by WA, and when all messages are received from WhatsApp
 * on (event: 'chats-received', (update: {hasNewChats?: boolean, hasReceivedLastMessage?: boolean}) => void): this
 */
const chatsReceived = ({ db, share, connWA, connWS }) => async ({ hasNewChats, hasReceivedLastMessage }) => {
}

module.exports = chatsReceived
