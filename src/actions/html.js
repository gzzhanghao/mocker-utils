import action from '../base'

export default action(html => (req, res) => {
  if (!res.headers['content-type']) {
    res.headers['content-type'] = 'text/html'
  }
  res.body = html
  return false
})
