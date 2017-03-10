import StylesBuffer from './lib/styles-buffer'
import ComponentFactory from './lib/component-factory'
import { defaults } from './lib/utils'

export default class Adonis {
  /**
   * @param  {Object} [options]
   * @param  {Boolean|String} [options.injection] - If `true`, styles will be injected on render,
   *                                              if `false`, they will not be injected. If set to
   *                                              `pre`, styles are injected before rendering.
   * @param  {String} [options.selectorPrefix] - The selector prepended to all CSS rules.
   */
  constructor (options) {
    this._options = defaults(options, {
      injection: true,
      minified: false,
      selectorPrefix: '',
      hashSeparator: '_',
      nameSeparator: '-o_O-',
      variationSeparator: '--'
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
