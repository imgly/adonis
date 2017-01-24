import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite/dist/aphrodite'
import Utils from './utils'

// We're using this so we can check if a passed object is a adonis component
class BaseAdonisComponent extends Component {}

export function create (target, styles, variations = {}) {
  const isTag = typeof target === 'string'
  const isAdonisComponent = BaseAdonisComponent.isPrototypeOf(target)
  const isComponent = !isAdonisComponent && Component.isPrototypeOf(target)

  const styleName = Utils.generateStyleNameForTarget(target)


  const stylesObject = {
    [styleName]: styles
  }

  // Attach variation styles to styles object
  const availableVariations = Object.keys(variations)
  availableVariations.forEach((variation) => {
    stylesObject[variation] = variations[variation]
  })

  const aphroStyles = StyleSheet.create(stylesObject)

  class AdonisComponent extends BaseAdonisComponent {
    render () {
      const { children, innerRef } = this.props
      const elementProps = {}

      // Clone props
      Object.keys(this.props)
        .forEach((prop) => {
          elementProps[prop] = this.props[prop]
        })

      // We are passing overriding styles using the `styles` property. Make sure we're generating
      // a class name using both the target's and the target's prop styles.
      let styles = [aphroStyles[styleName]]
      if (this.props.styles) {
        styles = styles.concat(this.props.styles)
      }

      // If an available variation is passed in as a property, we add the styles to the class and
      // remove the prop from the props we pass to our target element
      availableVariations.forEach((variation) => {
        if (elementProps[variation]) {
          styles.push(aphroStyles[variation])
          delete elementProps[variation]
        }
      })

      // Generate className
      elementProps.className = css.apply(null, styles)
      elementProps.styles = styles
      if (isComponent || isAdonisComponent) {
        elementProps.innerRef = innerRef
      } else {
        elementProps.ref = innerRef
      }

      // We don't want to pass invalid props to tags
      if (isTag) {
        delete elementProps.styles
        delete elementProps.innerRef
      }

      return React.createElement(target, elementProps, children)
    }
  }

  AdonisComponent.target = target
  AdonisComponent.styles = styles

  return AdonisComponent
}
