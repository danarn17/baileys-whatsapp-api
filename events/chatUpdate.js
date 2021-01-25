const mkChatUpdate = ({ number, sharedstate }) => async (...args) => {
  console.log(`${number} chatUpdate`)

}

module.exports = mkChatUpdate
