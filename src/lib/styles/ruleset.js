import { hashObject, resolveStylesObject } from '../utils'
import Rule from './rule'
import extensions from './extensions'

export default class Ruleset {
  constructor (adonis, selector, styles, options) {
    this._options = options

    this._adonis = adonis
    this._selector = selector
    this._styles = styles
    this._resolvedStyles = resolveStylesObject(this._styles, this._options.theme)

    this._hash = hashObject(this._styles)

    const { subRulesets, rules } = this._parseStyles()
    this._subRulesets = subRulesets
    this._rules = rules
  }

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

  _parseStyles () {
    const subRulesets = []
    const rules = []
    for (let key in this._resolvedStyles) {
      const value = this._resolvedStyles[key]
      const subRuleset = this._getSubRuleset(key, value)
      if (subRuleset) {
        subRulesets.push(subRuleset, subRuleset.getSubRulesets())
      } else {
        rules.push(new Rule(key, value))
      }
    }
    return { subRulesets, rules }
  }

  toCSS () {
    const { minified } = this._adonis.getOptions()

    let css = `${this._selector}`
    css += minified ? '{' : ' {\n'
    this._rules.forEach(rule => {
      css += (minified ? '' : '  ') + rule.toCSS(minified) + (minified ? '' : '\n')
    })
    css += '}'
    return css
  }

  getSubRulesets () {
    return this._subRulesets
  }
}
