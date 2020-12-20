const mkChatNew = require('./mkChatNew')
const mkChatUpdate = require('./mkChatUpdate')
const mkChatsReceived = require('./mkChatsReceived')
const mkChatsUpdate = require('./mkChatsUpdate')
const mkClose = require('./mkClose')
const mkConnecting = require('./mkConnecting')
const mkConnectionPhoneChange = require('./mkConnectionPhoneChange')
const mkConnectionValidated = require('./mkConnectionValidated')
const mkContactsReceived = require('./mkContactsReceived')
const mkCredentialsUpdated = require('./mkCredentialsUpdated')
const mkGroupParticipantsUpdate = require('./mkGroupParticipantsUpdate')
const mkGroupUpdate = require('./mkGroupUpdate')
const mkMessageStatusUpdate = require('./mkMessageStatusUpdate')
const mkOpen = require('./mkOpen')
const mkQr = require('./mkQr')
const mkReceivedPong = require('./mkReceivedPong')
const mkUserStatusUpdate = require('./mkUserStatusUpdate')
const mkWsClose = require('./mkWsClose')

module.exports = ({ db, share, connWA, connWS }) => {
  //
  // intermediate state to manage the deps
  //
  return {
    chatNew: mkChatNew({ db, share, connWA, connWS }),
    chatUpdate: mkChatUpdate({ db, share, connWA, connWS }),
    chatsReceived: mkChatsReceived({ db, share, connWA, connWS }),
    chatsUpdate: mkChatsUpdate({ db, share, connWA, connWS }),
    close: mkClose({ db, share, connWA, connWS }),
    connecting: mkConnecting({ db, share, connWA, connWS }),
    connectionPhoneChange: mkConnectionPhoneChange({ db, share, connWA, connWS }),
    connectionValidated: mkConnectionValidated({ db, share, connWA, connWS }),
    contactsReceived: mkContactsReceived({ db, share, connWA, connWS }),
    credentialsUpdated: mkCredentialsUpdated({ db, share, connWA, connWS }),
    groupParticipantsUpdate: mkGroupParticipantsUpdate({ db, share, connWA, connWS }),
    groupUpdate: mkGroupUpdate({ db, share, connWA, connWS }),
    messageStatusUpdate: mkMessageStatusUpdate({ db, share, connWA, connWS }),
    open: mkOpen({ db, share, connWA, connWS }),
    qr: mkQr({ db, share, connWA, connWS }),
    receivedPong: mkReceivedPong({ db, share, connWA, connWS }),
    userStatusUpdate: mkUserStatusUpdate({ db, share, connWA, connWS }),
    wsClose: mkWsClose({ db, share, connWA, connWS })
  }
}