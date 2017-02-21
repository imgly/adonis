import { Component } from 'react'
import DOMElements from './lib/dom-elements'
import BaseStyles from './lib/styles/base-styles'
import BaseAdonisComponent from './lib/components/base-adonis-component'
import { defaults } from './lib/utils'

class Adonis {
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
      selectorPrefix: null
    })
  }

  /**
   * Creates an adonis component for the given target
   * @param  {String|React.Component|AdonisComponent} target
   * @return {AdonisComponent}
   */
  createComponent (target) {
    const isTag = typeof target === 'string'
    const isAdonisComponent = target.prototype instanceof BaseAdonisComponent
    const isComponent = !isAdonisComponent && target.prototype instanceof Component

    console.log(target, isTag, isAdonisComponent, isComponent)
  }
}

export default (options) => {
  const adonis = new Adonis(options)

  // adonis()
  const factory = (target) => {
    if (target instanceof BaseStyles) {
      // adonis(BaseStyles).div(styles, variations, name)
      const baseStyles = target
      const factory = {}
      DOMElements.forEach((domElement) => {
        factory[domElement] = (styles, variations, name) => {
          adonis.createComponent(target, {
            styles, variations, name, baseStyles
          })
        }
      })
      return factory
    } else {
      // adonis(Component)(styles, variations, name)
      // adonis(AdonisComponent)(styles, variations, name)
      return (styles, variations, name) => adonis.createComponent(target, {
        styles, variations, name
      })
    }
  }

  // adonis.div(styles, variations, name)
  DOMElements.forEach((domElement) => {
    factory[domElement] = (styles, variations, name) => adonis.createComponent(domElement, {
      styles, variations, name
    })
  })

  return factory
}
