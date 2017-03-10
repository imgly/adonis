import { hashObject } from '../utils'

export default class Ruleset {
  constructor (adonis, styles, options) {
    this._adonis = adonis
    this._styles = styles
    this._options = options

    this._processStyles()
  }

  _processStyles () {
    const processObject = (obj, skipFunctions = false) => {
      let newObject = {}

      for (let prop in obj) {
        const value = obj[prop]
        const valueType = typeof value
        if (valueType === 'object') {
          newObject[prop] = processObject(value, skipFunctions)
        } else if (valueType === 'function') {
          if (!skipFunctions) {
            newObject[prop] = value(this._options.theme)
          }
        } else {
          newObject[prop] = value
        }
      }

      return newObject
    }
    this._staticStyles = processObject(this._options.styles, true)
    this._processedStaticStyles = processObject(this._options.styles)
  }

  getClassName () {
    const hashSeparator = this._adonis.getOption('hashSeparator')
    const hash = hashObject(this._staticStyles)
    return `${this._options.name}${hashSeparator}${hash}`
  }
}
