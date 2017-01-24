import React, { Component, PropTypes } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import Utils from './utils'

class BaseAdonisComponent extends Component {}
BaseAdonisComponent.contextTypes = {
  theme: PropTypes.object
}

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

  // In case we have any asynchronous style definitions (i.e. styles that need the theme passed
  // to the component, which is only available after the component has been instantiated),
  // we need to create the stylesheet on render.
  let injectOnRender = Utils.objectHasFunctions(stylesObject)

  let aphroStyles
  if (!injectOnRender) {
    aphroStyles = StyleSheet.create(stylesObject)
  }

  const ParentComponent = isComponent ? target : BaseAdonisComponent

  class AdonisComponent extends ParentComponent {
    /**
     * Walks through the given styles object. If it finds a function instead of a string / number,
     * it calls the function and passes the theme and puts the resulting value at the same position
     * @param  {Object} stylesObject
     * @return {Object}
     */
    _processStylesObject (stylesObject) {
      const processObject = (obj) => {
        let newObject = {}

        for (let prop in obj) {
          const value = obj[prop]
          const valueType = typeof value
          if (valueType === 'object') {
            newObject[prop] = processObject(value)
          } else if (valueType === 'function') {
            newObject[prop] = value(this.context.theme)
          } else {
            newObject[prop] = value
          }
        }

        return newObject
      }
      return processObject(stylesObject)
    }

    render () {
      if (injectOnRender) {
        aphroStyles = StyleSheet.create(this._processStylesObject(stylesObject))
      }

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

  AdonisComponent.contextTypes = ParentComponent.contextTypes
  AdonisComponent.target = target
  AdonisComponent.styles = styles

  return AdonisComponent
}
