/**
 * when the connection has closed
 * on (event: 'close', listener: (err: {reason?: DisconnectReason | string, isReconnecting: boolean}) => void): this
 */
const close = ({ db, share, connWA, connWS }) => async (err) => {
}

module.exports = close
