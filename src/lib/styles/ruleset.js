import { hashObject, resolveStylesObject } from '../utils'
import Declaration from './declaration'
import extensions from './extensions'

export default class Ruleset {
  constructor (adonis, selector, styles, options) {
    this._options = options

    this._adonis = adonis
    this._selector = selector
    this._styles = styles
    this._resolvedStyles = resolveStylesObject(this._styles, this._options.theme)

    this._hash = hashObject(this._styles)

    const { subRulesets, declarations } = this._parseStyles()
    this._subRulesets = subRulesets
    this._declarations = declarations
  }

  /**
   * If any registered extension resolves the given key to a sub ruleset, this method
   * returns the new Ruleset
   * @param  {String} key
   * @param  {String|Object} value
   * @return {Ruleset}
   * @private
   */
  _getSubRuleset (key, value) {
    const { minified } = this._adonis.getOptions()

    let subRuleset = null
    const generateSubRuleset = (newSelector) => {
      subRuleset = new Ruleset(this._adonis, newSelector, value, this._options)
    }

    for (let i = 0; i < extensions.length; i++) {
      const extension = extensions[i]
      extension(key, this._selector, generateSubRuleset, minified)
      if (subRuleset) return subRuleset
    }
  }

  /**
   * Parses this ruleset's styles object and returns the parsed declarations and sub rulesets
   * @return {Object}
   * @private
   */
  _parseStyles () {
    const subRulesets = []
    const declarations = []
    for (let key in this._resolvedStyles) {
      const value = this._resolvedStyles[key]
      const subRuleset = this._getSubRuleset(key, value)
      if (subRuleset) {
        subRulesets.push(subRuleset, subRuleset.getSubRulesets())
      } else {
        declarations.push(new Declaration(this._adonis, key, value))
      }
    }
    return { subRulesets, declarations }
  }

  /**
   * Returns the CSS string for this ruleset
   * @return {String}
   */
  toCSS () {
    const { minified } = this._adonis.getOptions()

    let css = `${this._selector}`
    css += minified ? '{' : ' {\n'
    this._declarations.forEach(rule => {
      css += rule.toCSS() + (minified ? '' : '\n')
    })
    css += '}'
    return css
  }

  /**
   * Returns this ruleset's sub rulesets
   * @return {Ruleset[]}
   */
  getSubRulesets () {
    return this._subRulesets
  }
}
