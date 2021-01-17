    await WA.connect()
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