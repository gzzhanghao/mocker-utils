import fs from 'fs'
import mime from 'mime-types'
import waitFor from 'event-to-promise'
import { Server } from 'ws'

const wss = new Server({ noServer: true })

/**
 * Creates a WebSocket connection with UpgradeRequest
 *
 * @param {mocker.UpgradeRequest} req
 */
export const ws = req => new Promise(resolve => {
  wss.handleUpgrade(...req.accept(), resolve)
})

/**
 * Add headers for response
 *
 * @param {mocker.Request} headers
 */
export const headers = headers => req => {
  req.transformResponse = res => {
    Object.assign(res.headers, headers)
  }
}

/**
 * Add CORS headers for response
 */
export const cors = () => req => headers({
  'access-control-allow-origin': req.headers['origin'],
  'access-control-allow-methods': req.headers['access-control-request-method'],
  'access-control-allow-headers': req.headers['access-control-request-headers'],
  'access-control-allow-credentials': 'true',
  'access-control-max-age': '86400',
})

/**
 * Respond with local file
 *
 * @param {string} path
 */
export const file = path => async () => {
  const body = fs.createReadStream(path)
  try {
    await waitFor(body, 'open', true)
  } catch (error) {
    return
  }
  return {
    headers: {
      'content-type': mime.lookup(path) || 'application/octet-stream',
    },
    body,
  }
}

/**
 * Save response body into local file
 *
 * @param {string} path
 */
export const save = path => async req => {
  const res = await req.send({ consume: false })

  const body = res.stream({ consume: false })
  const file = fs.createWriteStream(path)

  await waitFor(file, 'open')
  await waitFor(body.pipe(file), 'end')
}

/**
 * Respond with html content
 *
 * @param {string} body
 */
export const html = body => () => ({
  headers: {
    'content-type': 'text/html',
  },
  body,
})

/**
 * Respond with json content
 *
 * @param {any} json
 */
export const json = json => () => ({
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify(json),
})
