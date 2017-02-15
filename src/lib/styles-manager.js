export default class StylesManager {
  constructor (adonis, styles) {
    this._adonis = adonis
    this._styles = styles

    this._variationCombinations = {}
  }

  createStyleSheets (theme) {
    this._styles.forEach((style) =>
      style.createStyleSheet(theme)
    )
  }

  createStyleSheetsIfPossible () {
    this._styles.forEach((style) =>
      style.canInjectBeforeRender() && style.createStyleSheet()
    )
  }

  _getPossibleCombinations (set) {
    return (function acc (xs, set) {
      var x = xs[0]

      if (typeof x === 'undefined') {
        return set
      }

      for (var i = 0, l = set.length; i < l; ++i) {
        set.push(set[i].concat(x))
      }
      return acc(xs.slice(1), set)
    })(set, [[]]).slice(1)
  }

  prepareVariations (variations) {
    const possibleCombinations = this._getPossibleCombinations(variations)

    // Default
    this.getClassName([])

    possibleCombinations.forEach((variations) => {
      variations = variations.sort()
      this._variationCombinations[variations.join(',')] = this.getClassName(variations)
    })
  }

  /**
   * Returns the class name for the given variations and additional styles
   * @param  {String[]} variations
   * @param  {Object[]} additionalStyles
   * @return {Object}
   */
  getClassName (variations, additionalStyles) {
    let aphroStyles = []

    this._styles.forEach((styles) => {
      if (!styles) return

      aphroStyles.push(styles.getDefaultStylesheet())
      variations.sort().forEach((variation) => {
        aphroStyles.push(styles.getVariationStylesheet(variation))
      })
    })

    if (additionalStyles) {
      aphroStyles = aphroStyles.concat(additionalStyles)
    }

    aphroStyles = aphroStyles.filter((s) => s)

    return { styles: aphroStyles, className: this._adonis.aphrodite.css.apply(null, aphroStyles) }
  }

  setStyles (styles) {
    this._styles = styles
  }
}
