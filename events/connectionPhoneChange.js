const mkConnectionPhoneChange = ({ number, sharedstate }) => async (...args) => {
  console.log(`${number} connectionPhoneChange`)

}

module.exports = mkConnectionPhoneChange
