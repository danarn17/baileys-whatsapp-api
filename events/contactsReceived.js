const mkContactsReceived = ({ number, sharedstate }) => async (...args) => {
  console.log(`${number} contactsReceived`)

}

module.exports = mkContactsReceived
