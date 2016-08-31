import merge from 'lodash.merge'
import { action } from '../utils'

export default action(obj => req => {
  merge(req, obj)
})
