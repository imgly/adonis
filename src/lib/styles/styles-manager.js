import { flatten, deepMergeAll } from '../utils'
import Ruleset from './ruleset'

export default class StylesManager {
  constructor (adonis, styles, activeVariations) {
    this._adonis = adonis
    this._styles = styles
    this._activeVariations = activeVariations
    this._className = this._generateClassName()
    this._baseSelector = `.${this._className}`
    this._rulesets = this._generateRulesets()
  }

  generateCSS () {
    return this._rulesets
      .map(ruleset => ruleset.toCSS())
  }

  _getCombinedStyles () {
    const allStyles = flatten(
      this._styles
        .map(s => [s.getStyles(), s.getVariationStyles(this._activeVariations)])
    )

    return deepMergeAll(allStyles)
  }

  _generateClassName () {
    const { nameSeparator } = this._adonis.getOptions()
    return this._styles
      .map((style) => style.getIdentifierForVariations(this._activeVariations))
      .join(nameSeparator)
  }

  _generateRulesets () {
    const { theme } = this._adonis.getOptions()
    const defaultRuleset = new Ruleset(this._adonis, this._baseSelector, this._getCombinedStyles(), {
      theme
    })
    return flatten([defaultRuleset, defaultRuleset.getSubRulesets()])
  }

  getClassName () {
    return this._className
  }
}
