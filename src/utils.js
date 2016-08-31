export function action(handler) {
  return (...opts) => async (req, res) => {
    const args = await Promise.all(opts.map(opt =>
      typeof opt === 'function' ? opt(req, res) : opt
    ))
    return handler(...args)(req, res)
  }
}

export function waitFor(emitter, event, listenError) {
  return new Promise((resolve, reject) => {
    emitter.once(event, resolve)
    if (listenError) {
      emitter.once('error', reject)
    }
  })
}
