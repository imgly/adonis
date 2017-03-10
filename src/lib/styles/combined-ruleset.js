export default class CombinedRuleset {
  constructor (adonis, rulesets) {
    this._adonis = adonis
    this._rulesets = rulesets
  }

  getClassName () {
    const { selectorPrefix, nameSeparator, variationSeparator } = this._adonis.getOptions()

    return this._rulesets.reduce((acc, ruleset) => {
      const isFirst = ruleset === this._rulesets[0]
      if (!isFirst) {
        acc += ruleset.isVariation() ? variationSeparator : nameSeparator
      }
      acc += ruleset.getClassName()
      return acc
    }, selectorPrefix || '')
  }

  _getCombinedRules () {
    const combinedRulesMap = {}
    this._rulesets.forEach((ruleset) => {
      const rules = ruleset.getRules()
      rules.forEach((rule) => {
        combinedRulesMap[rule.key] = rule
      })
    })

    const combinedRules = []
    for (let key in combinedRulesMap) {
      combinedRules.push(combinedRulesMap[key])
    }
    return combinedRules
  }

  generateCSS () {
    const { minified } = this._adonis.getOptions()
    let css = ''

    // Selector
    css += `.${this.getClassName()}`
    if (!minified) css += ' '

    // Open brace
    css += '{'
    if (!minified) css += '\n'

    this._getCombinedRules()
      .forEach((rule) => {
        if (!minified) css += '  '
        css += rule.toCSS(minified)
        if (!minified) css += '\n'
      })

    // Close brace
    css += '}'

    return css
  }
}
