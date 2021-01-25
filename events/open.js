const fs = require('fs')

const mkOpen = ({ number, sharedstate }) => async (...args) => {
  console.log(`${number} open`)
  const WAC = sharedstate.WAC
  fs.writeFileSync(`auth_info/${number}.json`, JSON.stringify(WAC.base64EncodedAuthInfo(), null, 2))

}

module.exports = mkOpen
