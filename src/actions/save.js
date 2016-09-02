import fs from 'fs'
import waitFor from 'event-to-promise'
import action from './base'

export default action(path => async (req, res) => {
  const remoteRes = await req.send()
  const stream = fs.createWriteStream(path)

  remoteRes.pause()

  await waitFor(stream, 'open', true)

  remoteRes.pipe(stream)

  res.writeHead(remoteRes.statusCode, remoteRes.headers)
  remoteRes.pipe(res)

  await waitFor(remoteRes, 'end', true)
  return false
})
