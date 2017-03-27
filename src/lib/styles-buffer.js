import { requestAnimationFrame } from './utils'

export default class StylesBuffer {
  constructor (adonis) {
    this._adonis = adonis
    this._injectionEnabled = true
    this._bufferedSelectors = {}
    this._buffer = []
    this._styleNode = this._findStyleNode()
    this._sheet = this._findSheet()
  }

  /**
   * Finds the Stylesheet for our style node
   * @return {CSSStyleSheet}
   * @private
   */
  _findSheet () {
    if (!this._styleNode) return

    if (this._styleNode.sheet) {
      return this._styleNode.sheet
    }

    // Find stylesheet
    const { styleSheets } = document
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i]
      if (styleSheet.ownerNode === this._styleNode) {
        return styleSheet
      }
    }
  }

  /**
   * Finds the style node
   * @return {DOMElement}
   * @private
   */
  _findStyleNode () {
    let { styleNode } = this._adonis.getOptions()
    if (styleNode) {
      return styleNode
    }

    if (typeof document === 'undefined') return null

    styleNode = document.createElement('style')
    styleNode.setAttribute('data-adonis', true)
    document.head.appendChild(styleNode)
    return styleNode
  }

  /**
   * Buffers the given array of css rulesets
   * @param  {String[][]} rulesets
   */
  bufferRulesets (rulesets) {
    rulesets.forEach(([selector, css]) => {
      this._bufferedSelectors[selector] = true
    })
    Array.prototype.push.apply(this._buffer, rulesets.map(([, css]) => css))
  }

  /**
   * Checks if the given selector has been buffered already
   * @param  {String}  selector
   * @return {Boolean}
   */
  isSelectorBuffered (selector) {
    return this._bufferedSelectors[selector]
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

  /**
   * Injects the css rules using CSSStyleSheet#insertRule
   * @private
   */
  _injectFast () {
    this._buffer.forEach(rule => {
      this._sheet.insertRule(rule, this._sheet.cssRules.length)
    })
  }

  /**
   * Injects the css rules by appending text nodes to the style node
   * @private
   */
  _injectDebug () {
    const css = this.flushToString()
    if (!css) return

    const { minified } = this._adonis.getOptions()
    const hasContent = this._styleNode.innerHTML.length > 0
    this._styleNode.appendChild(
      document.createTextNode((minified || !hasContent ? '' : '\n\n') + css)
    )
  }

  /**
   * Actually flushes the css rules to the style node
   * @private
   */
  _flushToStyleTag () {
    const { injectionMode } = this._adonis.getOptions()

    if (injectionMode === 'fast' && this._sheet.insertRule) {
      this._injectFast()
    } else if (injectionMode === 'debug') {
      this._injectDebug()
    } else {
      throw new Error(`Unknown CSS injection mode: \`${injectionMode}\``)
    }

    this._buffer = []
  }

  /**
   * Schedules the injection of css rules into the style node
   */
  flushToStyleTag () {
    if (!this._injectionEnabled) return
    const { batchInjection } = this._adonis.getOptions()

    if (!this._nextTick && batchInjection) {
      this._nextTick = requestAnimationFrame(() => {
        this._nextTick = null
        this._flushToStyleTag()
      })
    } else if (!batchInjection) {
      this._flushToStyleTag()
    }
  }
}
