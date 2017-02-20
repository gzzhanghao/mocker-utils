import fs from 'fs'
import waitFor from 'event-to-promise'
import { PassThrough } from 'stream'

import decode from './handlers/decode'

export default path => async req => {
  const remoteRes = await req.send()
  const stream = fs.createWriteStream(path)

  remoteRes.pause()

  await waitFor(stream, 'open')

  const body = remoteRes.pipe(new PassThrough)
  const raw = await decode(remoteRes)

  raw.pipe(stream)

  return {
    body,
    statusCode: remoteRes.statusCode,
    headers: remoteRes.headers,
  }
}
