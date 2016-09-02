import waitFor from 'event-to-promise'

export default async (req, res) => {
  const remoteRes = await req.send()

  res.statusCode = remoteRes.statusCode
  res.headers = remoteRes.headers
  res.body = remoteRes

  return false
}
