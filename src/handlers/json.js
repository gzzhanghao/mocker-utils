import text from './text'

export default async function(res) {
  return JSON.parse(await text(res))
}
