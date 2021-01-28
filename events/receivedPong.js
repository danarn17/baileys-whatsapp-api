const mkReceivedPong = ({ number, sharedstate }) => async (...args) => {
  console.log(`${number} receivedPong`)

}

module.exports = mkReceivedPong
