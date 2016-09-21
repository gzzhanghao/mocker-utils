import fs from 'fs'
import waitFor from 'event-to-promise'
import { decode } from '@gzzhanghao/mocker-utils'
import { PassThrough } from 'stream'

import action from '../base'

export default action(path => async (req, res) => {
  const remoteRes = await req.send()
  const stream = fs.createWriteStream(path)

  remoteRes.pause()

  await waitFor(stream, 'open', true)

  const body = remoteRes.pipe(new PassThrough)
  const raw = await decode(remoteRes)

  raw.pipe(stream)

  res.statusCode = remoteRes.statusCode
  res.body = body

  Object.assign(res.headers, remoteRes.headers)

  return false
})
