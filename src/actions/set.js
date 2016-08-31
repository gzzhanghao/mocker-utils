import { action } from '../utils'

export default action(obj => req => {
  Object.assign(req, obj)
})
