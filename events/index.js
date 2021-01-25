const mkBlocklistUpdate = require('./blocklistUpdate')
const mkChatNew = require('./chatNew')
const mkChatUpdate = require('./chatUpdate')
const mkChatsReceived = require('./chatsReceived')
const mkClose = require('./close')
const mkConnecting = require('./connecting')
const mkConnectionPhoneChange = require('./connectionPhoneChange')
const mkContactUpdate = require('./contactUpdate')
const mkContactsReceived = require('./contactsReceived')
const mkGroupParticipantsUpdate = require('./groupParticipantsUpdate')
const mkGroupUpdate = require('./groupUpdate')
const mkInitialDataReceived = require('./initialDataReceived')
const mkOpen = require('./open')
const mkQr = require('./qr')
const mkReceivedPong = require('./receivedPong')
const mkWsClose = require('./wsClose')

const mkEvents = ({ number, sharedstate }) => ({
  blocklistUpdate: mkBlocklistUpdate({ number, sharedstate }),
  chatNew: mkChatNew({ number, sharedstate }),
  chatUpdate: mkChatUpdate({ number, sharedstate }),
  chatUpdate: mkChatUpdate({ number, sharedstate }),
  chatsReceived: mkChatsReceived({ number, sharedstate }),
  close: mkClose({ number, sharedstate }),
  connecting: mkConnecting({ number, sharedstate }),
  connectionPhoneChange: mkConnectionPhoneChange({ number, sharedstate }),
  contactUpdate: mkContactUpdate({ number, sharedstate }),
  contactsReceived: mkContactsReceived({ number, sharedstate }),
  groupParticipantsUpdate: mkGroupParticipantsUpdate({ number, sharedstate }),
  groupUpdate: mkGroupUpdate({ number, sharedstate }),
  initialDataReceived: mkInitialDataReceived({ number, sharedstate }),
  open: mkOpen({ number, sharedstate }),
  qr: mkQr({ number, sharedstate }),
  receivedPong: mkReceivedPong({ number, sharedstate }),
  wsClose: mkWsClose({ number, sharedstate })
})

module.exports = mkEvents