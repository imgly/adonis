import React, { Component, PropTypes } from 'react'
import Styles from './styles'
import StylesManager from './styles-manager'

class BaseAdonisComponent extends Component {}
BaseAdonisComponent.contextTypes = {
  theme: PropTypes.object
}

const getTargetStyles = (target) => {
  let styles = [target._adonisStyles, target._adonisBaseStyles]

  // Adonis target styled adonis target
  if (target._adonisTarget && typeof target._adonisTarget !== 'string') {
    styles = styles.concat(getTargetStyles(target._adonisTarget))
  }

  // Adonis target styled a react component
  if (target.RootElement) {
    styles = styles.concat(getTargetStyles(target.RootElement))
  }

  // React component extends a react component with root element
  const proto = Object.getPrototypeOf(target)
  if (proto) {
    styles = styles.concat(getTargetStyles(proto))
  }
  return styles.filter((style) => !!style)
}

export function create (adonis, target, stylesObject, variations = {}, baseStylesObject) {
  const isTag = typeof target === 'string'
  const isAdonisComponent = BaseAdonisComponent.isPrototypeOf(target)
  const isComponent = !isAdonisComponent && Component.isPrototypeOf(target)

  const styles = new Styles(target, stylesObject, variations)
  const baseStyles = baseStylesObject &&
    new Styles('baseStyles', baseStylesObject.styles, baseStylesObject.variations)

  let targetStyles = []
  if (adonis.preRenderInjection) {
    if (isComponent) {
      if (target.RootElement) {
        targetStyles = getTargetStyles(target)
      } else {
        console.log('Warning: Trying to pre-render CSS for React Component styled via adonis(Component).')
        console.log('         Due to the way that styles are inherited in aphrodite, it\'s possible that')
        console.log('         the rendered CSS is incomplete.')
      }
    } else {
      targetStyles = getTargetStyles(target)
    }
  }

  let allStyles = [baseStyles].concat(targetStyles).concat([styles])
    .filter(s => !!s)

  const stylesManager = new StylesManager(adonis, allStyles)
  if (adonis.preRenderInjection) {
    stylesManager.createStyleSheets(adonis.preRenderTheme)
  } else {
    stylesManager.createStyleSheetsIfPossible()
  }

  if (adonis.preRenderInjection) {
    stylesManager.prepareVariations(Object.keys(variations))
  }

  const ParentComponent = isComponent ? target : BaseAdonisComponent
  class AdonisComponent extends ParentComponent {
    /**
     * Returns a shallow clone of this component's props
     * @return {Object}
     * @private
     */
    _cloneProps () {
      const elementProps = {}
      Object.keys(this.props)
        .forEach((prop) => {
          elementProps[prop] = this.props[prop]
        })
      return elementProps
    }

    /**
     * Returns an array containing the active variations for this component
     * @return {String[]}
     * @private
     */
    _getActiveVariations () {
      return Object.keys(variations)
        .filter((variation) => !!this.props[variation])
    }

    /**
     * Renders the component
     * @return {React.Element|React.Component}
     */
    render () {
      stylesManager.createStyleSheets(this.context.theme)

      const activeVariations = this._getActiveVariations()
      const elementProps = this._cloneProps()

      // If an available variation is passed in as a property, we add the styles to the class and
      // remove the prop from the props we pass to our target element
      Object.keys(variations)
        .forEach((variation) => {
          delete elementProps[variation]
        })

      // Apply and pass styles
      let { styles: aphroStyles, className } =
        stylesManager.getClassName(activeVariations, this.props.styles)
      elementProps.className = className
      elementProps.styles = aphroStyles

      // Pass ref
      const { children, innerRef } = this.props
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
  AdonisComponent._adonisTarget = target
  AdonisComponent._adonisStyles = styles
  AdonisComponent._adonisBaseStyles = baseStyles

  return AdonisComponent
}
