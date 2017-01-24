import DOMElements from './lib/dom-elements'
import { create as createAdonisComponent } from './lib/adonis-component'

module.exports = (() => {
  let adonis = (base) => {
    return (styles, variations) => {
      return createAdonisComponent(base, styles, variations)
    }
  }

  DOMElements.forEach((tagName) => {
    adonis[tagName] = (styles, variations) => {
      return createAdonisComponent(tagName, styles, variations)
    }
  })

  return adonis
})()
