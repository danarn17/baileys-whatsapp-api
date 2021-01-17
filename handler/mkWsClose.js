/**
 *  when the socket has closed
 * on (event: 'ws-close', listener: (err: {reason?: DisconnectReason | string}) => void): this
 */
const wsClose = ({ db, share, connWA, connWS }) => async (err) => {
}

module.exports = wsClose
