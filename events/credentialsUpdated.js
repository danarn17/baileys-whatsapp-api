const fs = require('fs')

const mkCredentialsUpdated = ({ number, sharedstate }) => async (...args) => {
    console.log(`${number} credentialsUpdated`)

    const WAC = sharedstate.WAC
    fs.writeFileSync(`auth_info/${number}.json`, JSON.stringify(WAC.base64EncodedAuthInfo(), null, 2))
  
  }
  
  module.exports = mkCredentialsUpdated