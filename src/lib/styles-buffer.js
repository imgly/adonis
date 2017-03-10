export default class StylesBuffer {
  constructor () {
    this._injectionEnabled = true
    this._buffer = ''
  }

  disableInjection () {
    this._injectionEnabled = false
  }

  enableInjection () {
    this._injectionEnabled = true
  }

  flushToString () {
    return this._buffer
  }
}
