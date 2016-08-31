import { action } from '../utils'

export default action(hostname => req => {
  req.hostname = hostname
})
