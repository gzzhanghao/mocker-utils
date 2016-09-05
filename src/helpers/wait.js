import action from '../base'

export default action(timeout => () => new Promise(resolve => {
  setTimeout(resolve, timeout)
}))
