import { flatten, findAllCombinations } from '../utils'
import Ruleset from './ruleset'
import StylesManager from './styles-manager'

/**
 * The PreinjectionStylesManager is similar to StylesManager, except that it creates styles for
 * every possible combination of active variations
 */
export default class PreinjectionStylesManager extends StylesManager {
  constructor (adonis, styles, theme) {
    super(adonis, styles, [], theme)
  }

  /**
   * Generates rulesets for all possible variation combinations
   * @return {Ruleset[]}
   * @private
   */
  _generateVariationRulesets () {
    const allVariations = flatten(
      this._styles
        .map(s => s.getVariations())
    )
    const allCombinations = findAllCombinations(allVariations)

    return allCombinations.map((variations) => {
      const className = this._generateClassName(variations)
      const selector = `.${className}`
      return new Ruleset(this._adonis, selector, this._getCombinedStyles(variations), {
        theme: this._theme
      })
    })
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
    const rulesets = [defaultRuleset, defaultRuleset.getSubRulesets()]
    rulesets.push(this._generateVariationRulesets())
    return flatten(rulesets)
  }
}
