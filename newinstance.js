const fs = require('fs')
const fetch = require('node-fetch')
const { WAConnection } = require('@adiwajshing/baileys')

const newinstance = async ({ webhook }) => {
  const WAC = new WAConnection()
  WAC.browserDescription = ['newinstance', 'Chrome', '87']
  let attempts = 0

  WAC.on('qr', qr => {
    attempts += 1
    fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type: 'qr', qr, attempts })
    }).catch(() => {})
  })

  WAC.on('blocklist-update', () => {
    console.log('blocklist-update')
    const number = WAC.user.jid.split('@s.whatsapp.net')[0]
    fs.writeFileSync(`auth_info/${number}.json`, JSON.stringify(WAC.base64EncodedAuthInfo(), null, 2))
  })

  WAC.on('received-pong', () => {
    console.log('received-pong')
    WAC.close()
  })
  WAC.connect()
}

module.exports = newinstance
