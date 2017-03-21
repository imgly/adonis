import StylesBuffer from './lib/styles-buffer'
import ComponentFactory from './lib/component-factory'
import { defaults } from './lib/utils'

const production = typeof process !== 'undefined' &&
  process.env.NODE_ENV === 'production'

export default class Adonis {
  /**
   * @param  {Object} [options]
   * @param  {Boolean|String} [options.injection = true] If `true`, styles will be injected on render,
   *                                              if `false`, they will not be injected. If set to
   *                                              `pre`, styles are injected before rendering.
   * @param {Boolean} [options.minified = false] Should the resulting CSS be minified?
   * @param {Boolean} [options.autoPrefix = true] Should adonis automatically add vendor prefixes to
   *                                       CSS properties when necessary?
   * @param {String} [options.selectorPrefix = ''] The selector prepended to all CSS rules
   * @param {String} [options.hashSeparator = '~'] The string that is used to separate element names
   *                                         from their hashes
   * @param {String} [options.nameSeparator = '__'] The string that is used to separate multiple
   *                                        styled elements
   * @param {String} [options.variationSeparator = '--'] The string that is used to separate element
   *                                             identifiers from variation identifiers
   * @param {DOMElement} [options.styleNode] The <style> node that the CSS should be appended to
   */
  constructor (options) {
    this._options = defaults(options, {
      injection: true,
      minified: false,
      autoPrefix: true,
      selectorPrefix: '',
      hashSeparator: '~',
      nameSeparator: '__',
      variationSeparator: '--',
      styleNode: null,
      injectionMode: production ? 'fast' : 'debug'
    })
    this._stylesBuffer = new StylesBuffer(this)
    this._componentFactory = new ComponentFactory(this, this._options)
  }

  /**
   * Creates an adonis component for the given target
   * @param  {String|React.Component|AdonisComponent} target
   * @param  {Object} options
   * @return {AdonisComponent}
   */
  createComponent (target, options) {
    return this._componentFactory.createComponent(target, options)
  }

  /**
   * Renders the styles created in `renderFn` to a string and returns it
   * @param  {Function} renderFn
   * @return {String}
   */
  renderToStatic (renderFn) {
    this._stylesBuffer.disableInjection()

    const html = renderFn()

    const output = this._stylesBuffer.flushToString()
    this._stylesBuffer.enableInjection()

    return { css: { content: output }, html }
  }

  /**
   * Returns the styles buffer
   * @return {StylesBuffer}
   */
  getStylesBuffer () {
    return this._stylesBuffer
  }

  /**
   * Returns all options for this adonis instance
   * @return {Object}
   */
  getOptions () {
    return this._options
  }
}
