import action from '../base'

export default action(text => (req, res) => {
  res.body = text
  return false
})
