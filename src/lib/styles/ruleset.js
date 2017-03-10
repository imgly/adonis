import { hashObject } from '../utils'
import Rule from './rule'

export default class Ruleset {
  constructor (adonis, styles, options) {
    this._adonis = adonis
    this._styles = styles
    this._options = options

    this._processStyles()
  }

  isVariation () {
    return !!this._options.variation
  }

  _resolveSelector (selector) {
    return false
  }

  _processStyles () {
    this._prepareStyles()

    const { rules, subRulesets } = this._parseStyles()
    this._rules = rules
    this._subRulesets = subRulesets
  }

  _parseStyles () {
    const rules = []
    const subRulesets = []

    for (let key in this._processedStaticStyles) {
      var resolveResult = this._resolveSelector(key)
      if (resolveResult instanceof Ruleset) {
        subRulesets.push(resolveResult)
      } else {
        rules.push(new Rule(key, this._processedStaticStyles[key]))
      }
    }

    return { rules, subRulesets }
  }

  // @todo move this out of here - it's called multiple times per style. should probably go to
  //       style class instead, so that the processed styles object is passed to a ruleset
  _prepareStyles () {
    this._staticStyles = this._processStylesObject(this._options.styles, true)
    this._processedStaticStyles = this._processStylesObject(this._options.styles)
  }

  _processStylesObject (obj, skipFunctions = false) {
    let newObject = {}

    for (let prop in obj) {
      const value = obj[prop]
      const valueType = typeof value
      if (valueType === 'object') {
        newObject[prop] = this._processStylesObject(value, skipFunctions)
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

  getClassName () {
    const { hashSeparator } = this._adonis.getOptions()
    const hash = hashObject(this._staticStyles)
    return `${this._options.name}${hashSeparator}${hash}`
  }

  getRules () { return this._rules }
  getSubRulesets () { return this._subRulesets }
}
