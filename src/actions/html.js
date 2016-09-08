import action from '../base'

export default action(html => (req, res) => {
  res.headers['Content-Type'] = 'text/html'
  res.body = html
  return false
})
