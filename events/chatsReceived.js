const mkChatsReceived = ({ number, sharedstate }) => async (...args) => {
  console.log(`${number} chatsReceived`)

}

module.exports = mkChatsReceived