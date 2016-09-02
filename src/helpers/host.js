import action from '../base'

export default action(hostname => req => {
  req.hostname = hostname
})
