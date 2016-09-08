import action from '../base'

export default action(json => (req, res) => {
  if (!res.headers['content-type']) {
    res.headers['content-type'] = 'application/json'
  }
  res.body = JSON.stringify(json)
  return false
})
