const fs = require('fs')
const fetch = require('node-fetch')
const { WAConnection } = require('@adiwajshing/baileys')

const newinstance = async ({ webhook }) => {
  const WA = new WAConnection()
  WA.browserDescription = ['newinstance', 'Chrome', '87']
  let attempts = 0
  let creds

  WA.on('qr', async qr => {
    attempts += 1
    await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type: 'qr', qr, attempts })
    }).catch(() => {})
  })

  WA.on('credentials-updated', async auth => {
    creds = {
      clientID: auth.clientID,
      serverToken: auth.serverToken,
      clientToken: auth.clientToken,
      encKey: auth.encKey.toString('base64'),
      macKey: auth.macKey.toString('base64')
    }
  })

  WA.on('open', () => {
    setTimeout(() => {
      const number = WA.user.jid.split('@s.whatsapp.net')[0]
      fs.writeFileSync(`auth_info/${number}.json`, JSON.stringify(creds))
      fetch(webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'newinstance',
          userinfo: WA.user
        })
      }).catch(() => {})
      WA.close()
    }, 8_000)
  })

  WA.connect()
}

module.exports = newinstance
