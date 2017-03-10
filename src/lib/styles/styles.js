import Ruleset from './ruleset'

export default class Styles {
  constructor (adonis, options) {
    this._adonis = adonis
    this._options = options

    const { name, styles } = this._options
    this._defaultRuleset = new Ruleset(this._adonis, this, {
      name, styles
    })
    this._variationRulesets = this._buildVariationRulesets()
  }

  _buildVariationRulesets () {
    const rulesets = {}
    const { variations } = this._options
    const variationSeparator = this._adonis.getOption('variationSeparator')
    for (let key in variations) {
      const rulesetName = `${this._options.name}${variationSeparator}${key}`
      rulesets[key] = new Ruleset(this._adonis, this, {
        name: rulesetName,
        styles: variations[key]
      })
    }
    return rulesets
  }

  getDefaultRuleset () {
    return this._defaultRuleset
  }

  getVariationRuleset (variation) {
    return this._variationRulesets[variation]
  }
}
