import fs from 'fs'
import waitFor from 'event-to-promise'

import decode from '../handlers/decode'

export default path => async req => {
  const res = await req.send()
  const file = fs.createWriteStream(path)

  await waitFor(file, 'open')

  const body = await res.stream()

  await waitFor(body.pipe(file), 'close')
}
