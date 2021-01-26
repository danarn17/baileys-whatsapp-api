const mkOpen = require('./open')
const mkConnecting = require('./connecting')
const mkClose = require('./close')
const mkWsClose = require('./wsClose')
const mkQr = require('./qr')
const mkConnectionPhoneChange = require('./connectionPhoneChange')
const mkContactsReceived = require('./contactsReceived')
const mkChatsReceived = require('./chatsReceived')
const mkChatNew = require('./chatNew')
const mkChatUpdate = require('./chatUpdate')
const mkMessageStatusUpdate = require('./messageStatusUpdate')
const mkGroupParticipantsUpdate = require('./groupParticipantsUpdate')
const mkGroupUpdate = require('./groupUpdate')
const mkReceivedPong = require('./receivedPong')
const mkCredentialsUpdated = require('./credentialsUpdated')
const mkConnectionValidated = require('./connectionValidated')
const mkBlocklistUpdate = require('./blocklistUpdate')
const mkContactUpdate = require('./contactUpdate')

const mkEvents = ({ number, sharedstate }) => ({
  blocklistUpdate: mkBlocklistUpdate({ number, sharedstate }),
  chatNew: mkChatNew({ number, sharedstate }),
  chatUpdate: mkChatUpdate({ number, sharedstate }),
  chatUpdate: mkChatUpdate({ number, sharedstate }),
  chatsReceived: mkChatsReceived({ number, sharedstate }),
  close: mkClose({ number, sharedstate }),
  connecting: mkConnecting({ number, sharedstate }),
  connectionPhoneChange: mkConnectionPhoneChange({ number, sharedstate }),
  connectionValidated: mkConnectionValidated({ number, sharedstate }),
  contactUpdate: mkContactUpdate({ number, sharedstate }),
  contactsReceived: mkContactsReceived({ number, sharedstate }),
  credentialsUpdated: mkCredentialsUpdated({ number, sharedstate }),
  groupParticipantsUpdate: mkGroupParticipantsUpdate({ number, sharedstate }),
  groupUpdate: mkGroupUpdate({ number, sharedstate }),
  messageStatusUpdate: mkMessageStatusUpdate({ number, sharedstate }),
  open: mkOpen({ number, sharedstate }),
  qr: mkQr({ number, sharedstate }),
  receivedPong: mkReceivedPong({ number, sharedstate }),
  wsClose: mkWsClose({ number, sharedstate })
})

module.exports = mkEvents