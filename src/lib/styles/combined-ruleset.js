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
}
