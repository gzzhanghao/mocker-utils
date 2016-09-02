import fs from 'fs'
import mime from 'mime-types'
import action from '../base'

export default action(path => async (req, res) => {
  const stream = fs.createReadStream(path)

  try {
    await waitFor(stream, 'open', true)
  } catch (error) {
    return
  }

  res.headers['Content-Type'] = mime.lookup(path) || 'application/octet-stream'
  res.body = stream

  return false
})
