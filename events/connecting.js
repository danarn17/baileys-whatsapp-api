const mkConnecting = ({ number, sharedstate }) => async (...args) => {
  console.log(`${number} connecting`)

}

module.exports = mkConnecting
