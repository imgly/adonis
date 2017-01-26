import Utils from './utils'
import { StyleSheet } from '../globals'

export default class Styles {
  constructor (target, stylesObject, variationsObject = {}) {
    this._target = target
    this._stylesObject = stylesObject
    this._variationsObject = variationsObject
    this._defaultStyleName = Utils.generateStyleNameForTarget(target)

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
    const processObject = (obj) => {
      let newObject = {}

      for (let prop in obj) {
        const value = obj[prop]
        const valueType = typeof value
        if (valueType === 'object') {
          newObject[prop] = processObject(value)
        } else if (valueType === 'function') {
          newObject[prop] = value(theme)
        } else {
          newObject[prop] = value
        }
      }

      return newObject
    }
    this._processedStyles = processObject(this._combinedStyles)
  }

  /**
   * Injects the stylesheet after it has been processed
   * @param  {Object} theme
   * @private
   */
  createStyleSheet (theme) {
    if (this._needsProcessing && theme) {
      this._processStyles(theme)
    }
    this._styleSheet = StyleSheet.create(this._processedStyles || this._combinedStyles)
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
