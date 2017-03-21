export default class StylesBuffer {
  constructor (adonis) {
    this._adonis = adonis
    this._injectionEnabled = true
    this._buffer = []
  }

  /**
   * Buffers the given array of css rulesets
   * @param  {String[]} styles
   */
  bufferStyles (styles) {
    this._buffer = this._buffer.concat(styles)
  }

  /**
   * Disables the injection
   */
  disableInjection () {
    this._injectionEnabled = false
  }

  /**
   * Enables the injection
   */
  enableInjection () {
    this._injectionEnabled = true
  }

  /**
   * Flushes the buffered CSS to a string and returns it
   * @return {String}
   */
  flushToString () {
    const { minified } = this._adonis.getOptions()
    const content = this._buffer.join(minified ? '' : '\n\n')
    this._buffer = []
    return content
  }
}
