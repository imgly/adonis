export default class CombinedRuleset {
  constructor (adonis, rulesets) {
    this._adonis = adonis
    this._rulesets = rulesets
  }

  getClassName () {
    const nameSeparator = this._adonis.getOption('nameSeparator')

    return this._rulesets
      .map((ruleset) => ruleset.getClassName())
      .join(nameSeparator)
  }
}
