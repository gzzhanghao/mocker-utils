import fs from 'fs'
import waitFor from 'event-to-promise'

import decode from '../handlers/decode'

export default path => async req => {
  const res = await req.send()
  const file = fs.createWriteStream(path)

  const [body] = await Promise.all([
    res.stream(),
    waitFor(file, 'open'),
  ])

  await waitFor(body.pipe(file), 'close')
}
