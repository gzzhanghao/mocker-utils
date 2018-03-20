import fs from 'fs'
import promisify from 'es6-promisify'

export const readFile = promisify(fs.readFile)

export const writeFile = promisify(fs.writeFile)

export file from './actions/file'

export save from './actions/save'

export json from './actions/json'
