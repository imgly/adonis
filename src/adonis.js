import DOMElements from './lib/dom-elements'
import { create as createAdonisComponent } from './lib/adonis-component'
import BaseStyles from './lib/base-styles'

module.exports = (() => {
  let adonis = (base) => {
    if (base instanceof BaseStyles) {
      const factory = {}
      DOMElements.forEach((tagName) => {
        factory[tagName] = (styles, variations) => {
          return createAdonisComponent(tagName, styles, variations, base)
        }
      })
      return factory
    }

    return (styles, variations) => {
      return createAdonisComponent(base, styles, variations)
    }
  }

  DOMElements.forEach((tagName) => {
    adonis[tagName] = (styles, variations) => {
      return createAdonisComponent(tagName, styles, variations)
    }
  })

  adonis.css = (styles, variations) => {
    return new BaseStyles(styles, variations)
  }

  return adonis
})()
