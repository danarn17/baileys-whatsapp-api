const mkWsClose = ({ number, sharedstate }) => async (...args) => {
  console.log(`${number} wsClose`)

}

module.exports = mkWsClose
