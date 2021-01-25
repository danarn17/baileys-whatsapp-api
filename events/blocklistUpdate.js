const mkBlocklistUpdate = ({ number, sharedstate }) => async (...args) => {
  console.log(`${number} blocklistUpdate`)

}

module.exports = mkBlocklistUpdate