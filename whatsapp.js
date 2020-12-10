const { WAConnection } = require("@adiwajshing/baileys");
const handler = require('./handler')

// It'll be shared across all handlers
// default case
const _share = {
  name: 'example',
  color: true
}

module.exports = async ({creds = null, loggerLevel = null, db, share = _share, connWS }) => {
  const connWA = new WAConnection()   
  const hand = handler({ db, share, connWA, connWS }) 
  
  connWA.on('open', hand.open)
  connWA.on('connecting', hand.connecting)
  connWA.on('connection-validated', hand.connectionValidated)
  connWA.on('close', hand.close)
  connWA.on('ws-close', hand.wsClose)
  connWA.on('credentials-updated', hand.credentialsUpdated)
  connWA.on('qr', hand.qr)
  connWA.on('connection-phone-change', hand.connectionPhoneChange)
  connWA.on('user-status-update', hand.userStatusUpdate)
  connWA.on('chat-new', hand.chatNew)
  connWA.on('contacts-received', hand.contactsReceived)
  connWA.on('chats-received', hand.chatsReceived)
  connWA.on('chats-update', hand.chatsUpdate)
  connWA.on('chat-update', hand.chatUpdate)
  connWA.on('message-status-update', hand.messageStatusUpdate)
  connWA.on('group-participants-update', hand.groupParticipantsUpdate)
  connWA.on('group-update', hand.groupUpdate)
  connWA.on('received-pong', hand.receivedPong)
  
  if (creds) {
    connWA.loadAuthInfo(authInfo)
  }
  if (loggerLevel) {
    conn.logger.level = loggerLevel
  }

  await connWA.connect()
  
  return connWA
}