/**
 * when participants are added to a group
 * on (event: 'group-participants-update', listener: (update: {jid: string, participants: string[], actor?: string, action: WAParticipantAction}) => void): this
 */
const groupParticipantsUpdate = ({ db, share, connWA, connWS }) => async (user) => {
}

module.exports = groupParticipantsUpdate
