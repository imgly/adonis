import { hashObject } from '../utils'

export default class Styles {
  constructor (adonis, options) {
    this._adonis = adonis
    this._options = options

    this._hash = hashObject(this._options.styles)
    this._variationHashes = this._hashVariations()
  }

  _hashVariations () {
    const hashes = {}
    const { variations } = this._options
    for (let variation in variations) {
      const variationStyles = variations[variation]
      hashes[variation] = hashObject(variationStyles)
    }
    return hashes
  }

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

  getStyles () {
    return this._options.styles
  }

  getVariationStyles (variations) {
    const { variations: allVariations } = this._options
    return variations
      .map(variation => allVariations[variation])
  }
}
