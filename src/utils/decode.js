import zlib from 'zlib'
import stream from 'stream'
import waitFor from 'event-to-promise'

export default async res => {
  const encoding = res.headers['content-encoding']

  let body = res.pipe(new stream.PassThrough)

  if (encoding == 'gzip' || encoding == 'x-gzip') {

    return body.pipe(zlib.createGunzip())

  } else if (encoding == 'deflate' || encoding == 'x-deflate') {

    const chunk = await waitFor(res.pipe(new stream.PassThrough), 'data')

    if ((chunk[0] & 0x0F) === 0x08) {
      return body.pipe(zlib.createInflate())
    } else {
      return body.pipe(zlib.createInflateRaw())
    }
  }

  return body
}
