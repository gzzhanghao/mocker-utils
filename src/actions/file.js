import fs from 'fs'
import mime from 'mime-types'
import { action, waitFor } from '../utils'

export default action(path => async (req, res) => {
  const stream = fs.createReadStream(path)

  try {
    await waitFor(stream, 'open', true)
  } catch (error) {
    return
  }

  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': mime.lookup(path) || 'application/octet-stream',
  })

  stream.pipe(res)

  await waitFor(stream, 'end', true)
  return false
})
