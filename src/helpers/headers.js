import action from '../base'

export default action(obj => req => {
  Object.assign(req.headers, obj)
})
