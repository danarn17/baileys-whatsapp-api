const fetch = require('node-fetch')

// https://adiwajshing.github.io/Baileys/interfaces/wachat.html
const mkChatUpdate = ({ number, sharedstate }) => WAChat => {
  console.log(`${number} chatUpdate`)

  // it is not from a group && it is a message
  if (WAChat.jid.indexOf('-') === -1 && WAChat.messages) {
    const messages = WAChat.messages.toJSON()
    
    // it is a text message
    if (messages[0]?.message?.conversation) {

      // there is a webhook
      if (sharedstate.listentextmessage) {
        fetch(sharedstate.listentextmessage, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(WAChat, null, 2)
        }).catch(() => {})
      } else {
        console.log(JSON.stringify(WAChat, null, 2))
      }
    }
  }
}

module.exports = mkChatUpdate
