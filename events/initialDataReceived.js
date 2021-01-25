const mkInitialDataReceived = ({ number, sharedstate }) => async (...args) => {
  console.log(`${number} initialDataReceived`)

}

module.exports = mkInitialDataReceived
