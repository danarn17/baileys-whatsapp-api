const mkClose = ({ number, sharedstate }) => async (...args) => {
  console.log(`${number} close`)

}

module.exports = mkClose
