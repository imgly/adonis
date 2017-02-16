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
  return styles.filter((style) => !!style)
}

export function create (adonis, target, stylesObject, variations = {}, baseStylesObject, name) {
  if (typeof baseStylesObject !== 'object') {
    name = baseStylesObject
    baseStylesObject = undefined
  }

  const isTag = typeof target === 'string'
  const isAdonisComponent = target.prototype instanceof BaseAdonisComponent
  const isComponent = !isAdonisComponent && target.prototype instanceof Component

  const styles = new Styles(adonis, target, stylesObject, variations, name)
  const baseStyles = baseStylesObject &&
    new Styles(adonis, 'baseStyles', baseStylesObject.styles, baseStylesObject.variations, baseStylesObject.name || 'baseStyles')

  let targetStyles = []
  // Since style inheritance only happens during runtime, we need to grab the target's styles
  // when injecting before rendering (e.g. for server-side rendering)
  if (adonis.preRenderInjection) {
    if (isComponent) {
      // We have a special case for components, since we don't know their styles as long as we
      // don't have a `RootElement` property pointing to an adonis component (of which we DO know
      // the styles)
      if (target.RootElement) {
        targetStyles = getTargetStyles(target)
      } else {
        console && console.warn && console.warn(
          `Warning: Trying to pre-render CSS for a React Component (${target.name})
          styled via adonis(Component). Due to the way styles are inherited in aphrodite, it's
          possible that the rendered CSS is incomplete. If you're making use of style inheritance,
          please make sure you're attaching a \`RootElement\` to your React Component`
        )
      }
    } else {
      // We're grabbing the styles from our target
      targetStyles = getTargetStyles(target)
    }
  }

  let allStyles = [baseStyles].concat(targetStyles).concat([styles])
    .filter(s => !!s)

  let stylesManager = new StylesManager(adonis, allStyles)
  if (adonis.preRenderInjection) {
    stylesManager.createStyleSheets(adonis.preRenderTheme)
  } else {
    stylesManager.createStyleSheetsIfPossible()
  }

  if (adonis.preRenderInjection) {
    stylesManager.prepareVariations(Object.keys(variations))
  }

  class AdonisComponent extends BaseAdonisComponent {
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
      // We don't want to include target styles when rendering, because our rendering
      // mechanism makes sure styles are inherited (by passing a `styles` prop to children)
      allStyles = [baseStyles].concat([styles])
        .filter(s => !!s)
      stylesManager.setStyles(allStyles)

      // Don't create stylesheet twice
      if (!adonis.preRenderInjection) {
        stylesManager.createStyleSheets(this.context.theme)
      }

      const activeVariations = this._getActiveVariations()
      const elementProps = this._cloneProps()

      // If an available variation is passed in as a property, we add the styles to the class and
      // remove the prop from the props we pass to our target element
      Object.keys(variations)
        .forEach((variation) => {
          delete elementProps[variation]
        })

      // Apply and pass styles
      if (adonis.options.preInjection) {
        adonis.disableInjection()
      }

      let { styles: aphroStyles, className } =
        stylesManager.getClassName(activeVariations, this.props.styles)

      if (isTag) {
        // No need to pass the class name to components
        elementProps.className = [this.props.className, className].filter(c => c).join(' ')
      }

      elementProps.styles = aphroStyles
      if (adonis.options.preInjection) {
        adonis.enableInjection()
      }

      // Pass ref
      const { children, innerRef } = this.props
      if (innerRef) {
        if (isComponent || isTag) {
          elementProps.ref = innerRef
        } else if (isAdonisComponent) {
          elementProps.innerRef = innerRef
        }
      }

      // We don't want to pass invalid props to tags
      if (isTag) {
        delete elementProps.styles
        delete elementProps.innerRef
      }

      return React.createElement(target, elementProps, children)
    }
  }

  AdonisComponent.contextTypes = BaseAdonisComponent.contextTypes
  AdonisComponent._adonisTarget = target
  AdonisComponent._adonisStyles = styles
  AdonisComponent._adonisBaseStyles = baseStyles

  return AdonisComponent
}
