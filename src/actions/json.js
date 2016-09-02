import action from '../base'

export default action(json => (req, res) => {
  res.headers['Content-Type'] = 'application/json'
  res.body = JSON.stringify(json)
  return false
})
