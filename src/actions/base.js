export default handler => (...opts) => async (req, res) => {
  const args = await Promise.all(opts.map(opt =>
    typeof opt === 'function' ? opt(req, res) : opt
  ))
  return handler(...args)(req, res)
}
