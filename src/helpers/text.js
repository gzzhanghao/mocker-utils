import buffer from './buffer'

export default async function(res) {
  return (await buffer(res)).toString()
}
