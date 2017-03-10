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
    for (let key in variations) {
      rulesets[key] = new Ruleset(this._adonis, this, {
        name: key,
        styles: variations[key],
        variation: true
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
