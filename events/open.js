const mkOpen = ({ number, sharedstate }) => async (...args) => {
  console.log(`${number} open`)

}

module.exports = mkOpen
