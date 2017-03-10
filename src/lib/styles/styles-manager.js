export default class StylesManager {
  constructor (adonis, styles, baseStyles) {
    this._adonis = adonis
    this._styles = styles
    this._baseStyles = baseStyles
  }

  getRulesets (variations) {
    const rulesets = []
    this._styles.forEach((styles) => {
      if (!styles) return

      rulesets.push(styles.getDefaultRuleset())
      variations.sort()
        .forEach((variation) => {
          rulesets.push(styles.getVariationRuleset(variation))
        })
    })

    return rulesets.filter(r => r)
  }
}
