import React, { Component, PropTypes } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import Utils from './utils'
import Styles from './styles'

class BaseAdonisComponent extends Component {}
BaseAdonisComponent.contextTypes = {
  theme: PropTypes.object
}

export function create (target, stylesObject, variations = {}, baseStylesObject) {
  const isTag = typeof target === 'string'
  const isAdonisComponent = BaseAdonisComponent.isPrototypeOf(target)
  const isComponent = !isAdonisComponent && Component.isPrototypeOf(target)

  const styles = new Styles(target, stylesObject, variations)
  const baseStyles = baseStylesObject
    ? new Styles('baseStyles', baseStylesObject.styles, baseStylesObject.variations)
    : null

  if (styles.canInjectBeforeRender()) {
    styles.createStyleSheet()
  }

  if (baseStyles && baseStyles.canInjectBeforeRender()) {
    baseStyles.createStyleSheet()
  }

  const ParentComponent = isComponent ? target : BaseAdonisComponent
  class AdonisComponent extends ParentComponent {
    render () {
      if (!styles.canInjectBeforeRender()) {
        styles.createStyleSheet(this.context.theme)
      }
      if (baseStyles && !baseStyles.canInjectBeforeRender()) {
        baseStyles.createStyleSheet(this.context.theme)
      }

      const { children, innerRef } = this.props
      const elementProps = {}

      // Clone props
      Object.keys(this.props)
        .forEach((prop) => {
          elementProps[prop] = this.props[prop]
        })

      let aphroStyles = [];
      [baseStyles, styles].forEach((_styles) => {
        if (!_styles) return
        aphroStyles.push(_styles.getDefaultStylesheet())
        Object.keys(variations)
          .forEach((variation) => {
            if (elementProps[variation]) {
              aphroStyles.push(_styles.getVariationStylesheet(variation))
            }
          })
      })

      // We are passing overriding styles using the `styles` property
      if (this.props.styles) {
        aphroStyles = aphroStyles.concat(this.props.styles)
      }

      // If an available variation is passed in as a property, we add the styles to the class and
      // remove the prop from the props we pass to our target element
      Object.keys(variations)
        .forEach((variation) => {
          delete elementProps[variation]
        })

      // Generate className
      elementProps.className = css.apply(null, aphroStyles)
      elementProps.styles = aphroStyles
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
