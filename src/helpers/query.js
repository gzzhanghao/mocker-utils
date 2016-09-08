import action from '../base'

export default action(query => req => {
  req.setQuery(query)
})
