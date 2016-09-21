import waitFor from 'event-to-promise'

export default async (req, res) => {
  const remoteRes = await req.send()

  res.statusCode = remoteRes.statusCode
  res.body = remoteRes

  Object.assign(res.headers, remoteRes.headers)

  return false
}
