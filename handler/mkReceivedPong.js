/**
 * when WA sends back a pong
 * on (event: 'received-pong', listener: () => void): this
 */
const receivedPong = ({ db, share, connWA, connWS }) => async () => {
}

module.exports = receivedPong
