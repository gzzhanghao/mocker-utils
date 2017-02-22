import fs from 'fs'
import waitFor from 'event-to-promise'

import decode from '../handlers/decode'

export default path => async req => {
  const remoteRes = await req.send()
  const stream = fs.createWriteStream(path)

  remoteRes.pause()

  await waitFor(stream, 'open')

  const raw = await decode(remoteRes)

  await waitFor(raw.pipe(stream), 'close')
}
