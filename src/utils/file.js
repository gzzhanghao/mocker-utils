import fs from 'fs'
import { promisify } from 'bluebird'

export const readFile = promisify(fs.readFile)
export const writeFile = promisify(fs.writeFile)
