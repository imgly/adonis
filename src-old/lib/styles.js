import Utils from './utils'

export default class Styles {
  constructor (adonis, target, stylesObject, variationsObject = {}, name) {
    this._adonis = adonis
    this._target = target
    this._stylesObject = stylesObject
    this._variationsObject = variationsObject
    this._defaultStyleName = name || Utils.generateStyleNameForTarget(target)

    this._createCombinedStylesObject()
  }

  /**
   * Creates an object containing both the default style and the variations
   * @private
   */
  _createCombinedStylesObject () {
    this._combinedStyles = {
      [this._defaultStyleName]: this._stylesObject
    }

    for (let prop in this._variationsObject) {
      this._combinedStyles[prop] = this._variationsObject[prop]
    }

    this._needsProcessing = Utils.objectHasFunctions(this._combinedStyles)
  }

  /**
   * Walks through the combined object and calls every function it finds,
   * passing the theme
   * @param  {Object} theme
   * @private
   */
  _processStyles (theme) {
    const processObject = (obj, skipFunctions = false) => {
      let newObject = {}

      for (let prop in obj) {
        const value = obj[prop]
        const valueType = typeof value
        if (valueType === 'object') {
          newObject[prop] = processObject(value, skipFunctions)
        } else if (valueType === 'function') {
          if (!skipFunctions) {
            newObject[prop] = value(theme)
          }
        } else {
          newObject[prop] = value
        }
      }

      return newObject
    }
    this._staticProcessedStyles = processObject(this._combinedStyles, true)
    this._processedStyles = processObject(this._combinedStyles)
  }

  /**
   * Takes the aphrodite stylesheet objects and fixes their names so that the hash calculation
   * does not incorporate any variable styles. This allows us to render multiple themes into
   * external CSS files without having to re-compile the JavaScript (since changed theme values
   * would also affect the class names)
   * @private
   */
  _fixStylesheetNames () {
    for (let key in this._styleSheet) {
      const style = this._styleSheet[key]
      let [name] = style._name.split('_')

      // Important: use `_staticProcessedStyles` instead of `_processedStyles`, since they don't
      // include theme values
      const newHash = Utils.hashObject(this._staticProcessedStyles[key])
      style._name = `${name}_${newHash}`
    }
  }

  /**
   * Injects the stylesheet after it has been processed
   * @param  {Object} theme
   * @private
   */
  createStyleSheet (theme) {
    if (!this._styleSheet) {
      if (this._needsProcessing && theme) {
        this._processStyles(theme)
      }

      this._styleSheet = this._adonis.aphrodite.StyleSheet.create(this._processedStyles || this._combinedStyles)
      if (this._needsProcessing) {
        this._fixStylesheetNames()
      }
    }
  }

  /**
   * Checks if the stylesheet can be injected before the first render has been called
   * @return {Boolean}
   */
  canInjectBeforeRender () {
    return !this._needsProcessing
  }

  /**
   * Returns the default style sheet
   * @return {Object}
   */
  getDefaultStylesheet () {
    return this._styleSheet[this._defaultStyleName]
  }

  /**
   * Returns the stylesheet for the given variation
   * @param  {String} variation
   * @return {Object}
   */
  getVariationStylesheet (variation) {
    return this._styleSheet[variation]
  }
}
