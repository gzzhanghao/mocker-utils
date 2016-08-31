import fs from 'fs'
import { action, waitFor } from '../utils'

export default action(path => async (req, res) => {
  const stream = fs.createReadStream(path)

  try {
    await waitFor(stream, 'open', true)
  } catch (error) {
    return
  }

  res.writeHead({
    // @todo Content-Type
  })

  stream.pipe(res)

  await waitFor(stream, 'end', true)
  return false
})
