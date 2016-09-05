import zlib from 'zlib'
import stream from 'stream'
import waitFor from 'event-to-promise'

export default async function(res) {
  const buffers = []
  const encoding = res.headers['content-encoding']

  let body = res.pipe(new stream.PassThrough)

  if (encoding == 'gzip' || encoding == 'x-gzip') {

    body = body.pipe(zlib.createGunzip())

  } else if (encoding == 'deflate' || encoding == 'x-deflate') {

    const chunk = await waitFor(res.pipe(new stream.PassThrough), 'data')

    if ((chunk[0] & 0x0F) === 0x08) {
      body = body.pipe(zlib.createInflate())
    } else {
      body = body.pipe(zlib.createInflateRaw())
    }
  }

  body.on('data', chunk => {
    buffers.push(chunk)
  })

  await waitFor(body, 'end')

  return Buffer.concat(buffers)
}
