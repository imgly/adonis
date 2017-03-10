export default class StylesManager {
  constructor (adonis, styles, baseStyles) {
    this._adonis = adonis
    this._styles = styles
    this._baseStyles = baseStyles
  }

  _generateClassName (rulesets) {
    const nameSeparator = this._adonis.getOption('nameSeparator')
    return rulesets
      .map((ruleset) => ruleset.getClassName())
      .join(nameSeparator)
  }

  getClassName (variations) {
    const rulesets = []

    this._styles.forEach((styles) => {
      if (!styles) return

      rulesets.push(styles.getDefaultRuleset())
      variations.sort()
        .forEach((variation) => {
          rulesets.push(styles.getVariationRuleset(variation))
        })
    })

    return {
      rulesets: rulesets.filter((r) => r),
      className: this._generateClassName(rulesets)
    }
  }
}
