import CSSPrefixes from '../css-prefixes'

export default class Rule {
  constructor (adonis, key, value) {
    this._adonis = adonis
    this.key = key
    this.value = value
    this.cssKey = this.key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
  }

  _getAutoPrefixedKeyPairs () {
    const prefixes = CSSPrefixes[this.key]
    const keyPairs = []
    if (prefixes) {
      prefixes.forEach((prefix) => {
        keyPairs.push([`-${prefix}-${this.cssKey}`, this.value])
      })
    }
    return keyPairs
  }

  toCSS () {
    const { minified, autoPrefix } = this._adonis.getOptions()

    let keyPairs = [[this.cssKey, this.value]]
    if (autoPrefix) {
      keyPairs = keyPairs.concat(this._getAutoPrefixedKeyPairs())
    }

    return keyPairs.map(([key, value]) => {
      return `${minified ? '' : '  '}${key}:${minified ? '' : ' '}${value};`
    }).join(minified ? '' : '\n')
  }
}
