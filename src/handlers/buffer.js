import waitFor from 'event-to-promise'
import decode from './decode'

export default async function(res) {
  const buffers = []

  const raw = await decode(res)
  await waitFor(raw.on('data', chunk => buffers.push(chunk)), 'end')

  return Buffer.concat(buffers)
}
