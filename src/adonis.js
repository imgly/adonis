import DOMElements from './lib/dom-elements'
import { create as createAdonisComponent } from './lib/adonis-component'
import BaseStyles from './lib/base-styles'
import Utils from './lib/utils'

module.exports = (options = {}, { StyleSheetTestUtils, css, StyleSheet }) => {
  options = Utils.defaults(options, {
    noInjection: false,
    noObjectStyles: false
  })

  let adonis = (base) => {
    if (base instanceof BaseStyles) {
      const factory = {}
      DOMElements.forEach((tagName) => {
        factory[tagName] = (styles, variations) => {
          return createAdonisComponent(adonis, tagName, styles, variations, base)
        }
      })
      return factory
    }

    return (styles, variations) => {
      return createAdonisComponent(adonis, base, styles, variations)
    }
  }

  DOMElements.forEach((tagName) => {
    adonis[tagName] = (styles, variations) => {
      return createAdonisComponent(adonis, tagName, styles, variations)
    }
  })

  adonis.css = (styles, variations) => {
    return new BaseStyles(styles, variations)
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

  if (options.noInjection && !options.noObjectStyles) {
    adonis.disableInjection()
  }

  adonis.preRenderTheme = null
  adonis.preRenderInjection = false

  adonis.aphrodite = {
    StyleSheet,
    css
  }
  adonis.Utils = Utils

  return adonis
}
