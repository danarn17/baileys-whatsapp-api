const fs = require('fs')
const { WAConnection } = require('@adiwajshing/baileys')
const express = require('express')
const newinstance = require('./newinstance')

const appPort = process.env.APP_PORT || '3000'

const app = express()
const patchpanel = new Map()

app.get('/', (req, res) => {
  res.status(200).send('Baileys API using express. https://github.com/danarn17/baileys-whatsapp-api')
})

app.post('/new', express.json(), async (req, res) => {
  const { webhook } = req.body
  newinstance({ webhook })
  res.status(200).json({ type: 'new', webhook })
})

app.get('/:number/up', async (req, res) => {
  const { number } = req.params
  if (!patchpanel.has(number)) {
    const WA = new WAConnection() 
    WA.browserDescription = ['danarn17', 'Chrome', '87']
    WA.loadAuthInfo(`./auth_info/${number}.json`)

    WA.on('credentials-updated', async auth => {
      const creds = {
        clientID: auth.clientID,
        serverToken: auth.serverToken,
        clientToken: auth.clientToken,
        encKey: auth.encKey.toString('base64'),
        macKey: auth.macKey.toString('base64')
      }
      fs.writeFileSync(`auth_info/${number}.json`, JSON.stringify(creds))
    })

    await WA.connect()

    patchpanel.set(number, WA)
    res.status(200).json({ type: 'up', number })    
  }
})

app.get('/:number/down', async (req, res) => {
  const { number } = req.params
  if (patchpanel.has(number)) {
    const WA = patchpanel.get(number)
    WA.close()
    patchpanel.delete(number)
    res.status(200).json({ type: 'down', number })
  }
})

app.listen(appPort, () => {
  console.log(`Example app listening at http://localhost:${appPort}`)
})