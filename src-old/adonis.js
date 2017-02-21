import DOMElements from './lib/dom-elements'
import { create as createAdonisComponent } from './lib/adonis-component'
import BaseStyles from './lib/base-styles'
import Utils from './lib/utils'

module.exports = (options = {}, { StyleSheetTestUtils, css, StyleSheet }) => {
  options = Utils.defaults(options, {
    noInjection: false,
    noObjectStyles: false,
    preInjection: false
  })

  let adonis = (base) => {
    if (base instanceof BaseStyles) {
      const factory = {}
      DOMElements.forEach((tagName) => {
        factory[tagName] = (styles, variations, name) => {
          if (typeof variations !== 'object') {
            name = variations
            variations = undefined
          }
          return createAdonisComponent(adonis, tagName, styles, variations, base, name)
        }
      })
      return factory
    }

    return (styles, variations, name) => {
      if (typeof variations !== 'object') {
        name = variations
        variations = undefined
      }
      return createAdonisComponent(adonis, base, styles, variations, name)
    }
  }

  adonis.options = options

  DOMElements.forEach((tagName) => {
    adonis[tagName] = (styles, variations, name) => {
      if (typeof variations !== 'object') {
        name = variations
        variations = undefined
      }
      return createAdonisComponent(adonis, tagName, styles, variations, name)
    }
  })

  adonis.css = (styles, variations, name) => {
    if (typeof variations !== 'object') {
      name = variations
      variations = undefined
    }
    return new BaseStyles(styles, variations, name)
  }

  adonis.enablePreRenderInjection = (theme) => {
    adonis.preRenderInjection = true
    adonis.preRenderTheme = theme
  }

  adonis.disablePreRenderInjection = () => {
    adonis.preRenderInjection = true
  }

  adonis.disableInjection = () => {
    StyleSheetTestUtils.suppressStyleInjection()
  }

  adonis.enableInjection = () => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection()
  }

  if (options.noInjection && !options.noObjectStyles) {
    adonis.disableInjection()
  }

  adonis.preRenderTheme = null
  adonis.preRenderInjection = false

  if (options.preInjection) {
    adonis.enablePreRenderInjection()
  }

  adonis.aphrodite = {
    StyleSheet,
    css
  }
  adonis.Utils = Utils

  return adonis
}
