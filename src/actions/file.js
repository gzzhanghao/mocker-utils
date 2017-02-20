import fs from 'fs'
import mime from 'mime-types'
import waitFor from 'event-to-promise'

export default path => async req => {
  const body = fs.createReadStream(path)

  try {
    await waitFor(body, 'open', true)
  } catch (error) {
    return
  }

  return {
    body,
    headers: {
      'content-type': mime.lookup(path) || 'application/octet-stream',
    },
  }
}
