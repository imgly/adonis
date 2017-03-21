import { hashObject } from '../utils'

export default class Styles {
  constructor (adonis, options) {
    this._adonis = adonis
    this._options = options

    const { hashedStyles } = this._adonis.getOptions()
    if (hashedStyles && typeof this._options.styles !== 'string') {
      throw new Error('Passing style objects with `hashedStyles` set to true is invalid.')
    }
    this._hash = hashedStyles ? this._options.styles : hashObject(this._options.styles)
    this._variationHashes = this._hashVariations()
  }

  /**
   * Generates hashes for all existing variations
   * @return {Object}
   * @private
   */
  _hashVariations () {
    const hashes = {}
    const { hashedStyles } = this._adonis.getOptions()
    const { variations } = this._options
    for (let variation in variations) {
      const variationStyles = variations[variation]
      hashes[variation] = hashedStyles ? variationStyles : hashObject(variationStyles)
    }
    return hashes
  }

  /**
   * Returns an identifier for the given active variations
   * @param  {String[]} variations
   * @return {String}
   */
  getIdentifierForVariations (variations) {
    const { name } = this._options
    const { hashSeparator, variationSeparator } = this._adonis.getOptions()
    let identifier = `${name}${hashSeparator}${this._hash}`
    variations.sort()
      .forEach((variation) => {
        const hash = this._variationHashes[variation]
        if (!hash) return
        identifier += `${variationSeparator}${variation}${hashSeparator}${hash}`
      })
    return identifier
  }

  /**
   * Returns the styles object
   * @return {Object}
   */
  getStyles () {
    return this._options.styles
  }

  /**
   * Returns the styles for the given variations
   * @param  {String[]} variations
   * @return {Object[]}
   */
  getVariationStyles (variations) {
    const { variations: allVariations } = this._options
    return variations
      .map(variation => allVariations[variation])
  }

  /**
   * Returns all available variations
   * @return {String[]}
   */
  getVariations () {
    return Object.keys(this._options.variations || {})
  }
}
