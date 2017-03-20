export default class StylesBuffer {
  constructor (adonis) {
    this._adonis = adonis
    this._injectionEnabled = true
    this._buffer = []
  }

  bufferStyles (styles) {
    this._buffer = this._buffer.concat(styles)
  }

  disableInjection () {
    this._injectionEnabled = false
  }

  enableInjection () {
    this._injectionEnabled = true
  }

  flushToString () {
    const { minified } = this._adonis.getOptions()
    const content = this._buffer.join(minified ? '' : '\n\n')
    this._buffer = []
    return content
  }
}
