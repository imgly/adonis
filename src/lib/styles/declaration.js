import CSSPrefixes from '../css-prefixes'

export default class Declaration {
  constructor (adonis, key, value) {
    this._adonis = adonis
    this.key = key
    this.value = value
    this.cssKey = this.key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
  }

  /**
   * If this declaration's key requires vendor prefixes, this function returns an array of [key, value]
   * pairs with prefixed keys.
   * @return {Array[]}
   * @private
   */
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

  /**
   * Returns the CSS string for this declaration
   * @return {String}
   */
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
