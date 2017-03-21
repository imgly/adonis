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

  /**
   * Generates the CSS of all rulesets
   * @return {String[]}
   */
  generateCSS () {
    return this._rulesets
      .map(ruleset => ruleset.toCSS())
  }

  /**
   * Returns the deeply merged styles object
   * @return {Object}
   * @private
   */
  _getCombinedStyles () {
    const allStyles = flatten(
      this._styles
        .map(s => [s.getStyles(), s.getVariationStyles(this._activeVariations)])
    )

    return deepMergeAll(allStyles)
  }

  /**
   * Generates the class name
   * @return {String}
   * @private
   */
  _generateClassName () {
    const { nameSeparator, selectorPrefix } = this._adonis.getOptions()
    return selectorPrefix + this._styles
      .map((style) => style.getIdentifierForVariations(this._activeVariations))
      .join(nameSeparator)
  }

  /**
   * Generates the rulesets and sub rulesets
   * @return {Ruleset[]}
   * @private
   */
  _generateRulesets () {
    const defaultRuleset = new Ruleset(this._adonis, this._baseSelector, this._getCombinedStyles(), {
      theme: this._theme
    })
    return flatten([defaultRuleset, defaultRuleset.getSubRulesets()])
  }

  /**
   * Returns the class name
   * @return {String}
   */
  getClassName () {
    return this._className
  }
}
