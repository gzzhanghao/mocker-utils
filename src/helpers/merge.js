import merge from 'lodash.merge'
import action from '../base'

export default action(obj => req => {
  merge(req, obj)
})
