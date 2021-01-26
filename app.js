const { WAConnection, MessageType } = require('@adiwajshing/baileys')
const express = require('express')
const newinstance = require('./newinstance')
const mkEvents = require('./events')
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
    const WAC = new WAConnection() 
    WAC.browserDescription = ['danarn17', 'Chrome', '87']
    WAC.loadAuthInfo(`./auth_info/${number}.json`)

    const sharedstate = {}
    sharedstate.WAC = WAC

    const events = mkEvents({ number, sharedstate })
    WAC.on('blocklist-update', events.blocklistUpdate)
    WAC.on('chat-new', events.chatNew)
    WAC.on('chats-received', events.chatsReceived)
    WAC.on('chat-update', events.chatUpdate)
    WAC.on('close', events.close)
    WAC.on('connecting', events.connecting)
    WAC.on('connection-phone-change', events.connectionPhoneChange)
    WAC.on('connection-validated', events.connectionValidated)
    WAC.on('contacts-received', events.contactsReceived)
    WAC.on('contact-update', events.contactUpdate)
    WAC.on('credentials-updated', events.credentialsUpdated)
    WAC.on('group-participants-update', events.groupParticipantsUpdate)
    WAC.on('group-update', events.groupUpdate)
    WAC.on('message-status-update', events.messageStatusUpdate)
    WAC.on('open', events.open)
    WAC.on('qr', events.qr)
    WAC.on('received-pong', events.receivedPong)
    WAC.on('ws-close', events.wsClose)

    await WAC.connect()

    patchpanel.set(number, { WAC, sharedstate })
    res.status(200).json({ type: 'up', number })    
  }
})

app.get('/:number/sendtextmessage/to/:to/message/:msg', async (req, res) => {
  const number = req.params.number
  const to = req.params.to
  const msg = req.params.msg

  if (patchpanel.has(number)) {
    if (to && msg) {
      const { WAC } = patchpanel.get(number)
      const sent = await WAC.sendMessage(`${to}@s.whatsapp.net`, msg, MessageType.text )
      res.json(sent)
    } else {
      res.status(400)
    }
  } else {
    res.status(404)
  }
})

app.get('/:number/contacts', (req, res) => {
  const number = req.params.number

  if (patchpanel.has(number)) {
    const { WAC } = patchpanel.get(number)
    if (WAC.contacts) {
      const contacts = Object.keys(WAC.contacts)
        .filter(el => el.indexOf('-') === -1)
        .map(el => el.split('@s.whatsapp.net')[0])

      res.status(200).json(contacts)
    } else {
      res.status(400)
    }
  } else {
    res.status(404)
  }
})

app.get('/:number/down', async (req, res) => {
  const { number } = req.params
  if (patchpanel.has(number)) {
    const { WAC } = patchpanel.get(number)
    WAC.close()
    patchpanel.delete(number)
    res.status(200).json({ type: 'down', number })
  } else {
    res.status(404)
  }
})

app.post('/:number/listentextmessage', express.json(), async (req, res) => {
  const { number } = req.params
  if (patchpanel.has(number)) {
    const { sharedstate } = patchpanel.get(number)
    const { webhook } = req.body
    if (webhook) {
      sharedstate.listentextmessage = webhook
      res.status(200).json({ type: 'listentextmessage', webhook, number })
    }
  } else {
    res.status(404)
  }
})

app.listen(appPort, () => {
  console.log(`Example app listening at http://localhost:${appPort}`)
})