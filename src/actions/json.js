export default json => req => ({
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify(json),
})
