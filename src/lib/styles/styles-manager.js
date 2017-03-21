import { flatten, deepMergeAll } from '../utils'
import Ruleset from './ruleset'

export default class StylesManager {
  constructor (adonis, styles, activeVariations, theme) {
    this._adonis = adonis
    this._styles = styles
    this._theme = theme
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
    const { nameSeparator, selectorPrefix } = this._adonis.getOptions()
    return selectorPrefix + this._styles
      .map((style) => style.getIdentifierForVariations(this._activeVariations))
      .join(nameSeparator)
  }

  _generateRulesets () {
    const defaultRuleset = new Ruleset(this._adonis, this._baseSelector, this._getCombinedStyles(), {
      theme: this._theme
    })
    return flatten([defaultRuleset, defaultRuleset.getSubRulesets()])
  }

  getClassName () {
    return this._className
  }
}
