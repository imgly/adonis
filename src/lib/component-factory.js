import React, { Component } from 'react'
import { flatten } from './utils'
import BaseAdonisComponent from './components/base-adonis-component'
import Styles from './styles/styles'
import StylesManager from './styles/styles-manager'
import PreinjectionStylesManager from './styles/preinjection-styles-manager'

export default class ComponentFactory {
  constructor (adonis, options) {
    this._adonis = adonis
    this._options = options
  }

  /**
   * Returns a string name for the given target
   * @param  {String|Object} target
   * @return {String}
   * @private
   */
  _getName (target) {
    if (typeof target === 'string') return target
    if (target.name) return target.name
    return 'adonis'
  }

  /**
   * Returns the given target's styles. This function gets the styles recursively, meaning that
   * if the target has another target, it returns its styles as well.
   * @param  {ReactComponent|BaseAdonisComponent} target
   * @return {Styles[]}
   * @private
   */
  _getTargetStyles (target) {
    const styles = [target.adonisStyles, target.adonisBaseStyles]

    // Target has another target, get its styles
    if (target.adonisTarget && typeof target.adonisTarget === 'string') {
      styles.push(this._getTargetStyles(target.adonisTarget))
    }

    // Target has a RootElement that inherits styles
    if (target.RootElement) {
      styles.push(this._getTargetStyles(target.RootElement))
    }

    return flatten(styles).filter(s => s)
  }

  /**
   * Creates an adonis component for the given target
   * @param  {String|React.Component|AdonisComponent} target
   * @param  {Object} options
   * @return {AdonisComponent}
   */
  createComponent (target, options) {
    const adonis = this._adonis
    let { name } = options
    if (!name) name = this._getName(target)

    const isTag = typeof target === 'string'
    const isAdonisComponent = target.prototype instanceof BaseAdonisComponent
    const isComponent = !isAdonisComponent && target.prototype instanceof Component

    const { styles, variations, baseStyles } = options
    const stylesObject = new Styles(adonis, { styles, variations, name })

    let allStyles, stylesManager
    const { injection, theme, hashedStyles } = adonis.getOptions()
    if (injection === 'pre' && !hashedStyles) {
      const targetStyles = this._getTargetStyles(target)
      allStyles = targetStyles.concat([baseStyles, stylesObject]).filter(s => s)
      stylesManager = new PreinjectionStylesManager(adonis, allStyles, theme)

      const stylesBuffer = adonis.getStylesBuffer()
      stylesBuffer.bufferRulesets(stylesManager.generateCSS())
      stylesBuffer.flushToStyleTag()
    }

    class AdonisComponent extends BaseAdonisComponent {
      constructor (...args) {
        super(...args)

        this._updateStylesManager()
        this._adonis = adonis
      }

      /**
       * Updates the styles manager for the given props
       * @param  {Object} props
       * @private
       */
      _updateStylesManager (props = this.props) {
        const activeVariations = this._getActiveVariationsFromProps(props)
        allStyles = [baseStyles, stylesObject, props.styles].filter(s => s)
        stylesManager = new StylesManager(adonis, allStyles, activeVariations, this.context.theme)
      }

      /**
       * Invoked before a mounted component receives new props
       * @param  {Object} props
       */
      componentWillReceiveProps (props) {
        const stylesChanged = props.styles !== this.props.styles

        let variationsChanged = false
        Object.keys(variations || {})
          .forEach((variation) => {
            if (props[variation] !== this.props[variation]) {
              variationsChanged = true
            }
          })

        if (stylesChanged || variationsChanged) {
          this._updateStylesManager(props)
        }
      }

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
       * Returns an array containing the active variations for this component from the given props
       * @param {Object} props
       * @return {String[]}
       * @private
       */
      _getActiveVariationsFromProps (props = this.props) {
        const { variations } = options
        return Object.keys(variations || {})
          .filter((variation) => !!props[variation])
          .sort()
      }

      /**
       * Builds the class name for this component
       * @return {String}
       * @private
       */
      _buildClassName () {
        const { className: passedClassName } = this.props

        // We can pass additional class names to components
        const classNames = []
        classNames.push(passedClassName)

        // Generate a class name for this component
        classNames.push(stylesManager.getClassName())

        return { className: classNames.filter(c => c).join(' ') }
      }

      /**
       * Checks if CSS injection for this component is required
       * @private
       */
      _shouldInjectCSS () {
        if (!injection || hashedStyles) return false

        // Injection is only needed if the rendered child is a real tag
        return isTag || (isComponent && !isAdonisComponent)
      }

      /**
       * Renders this component
       * @return {React.Element}
       */
      render () {
        const elementProps = this._cloneProps()
        const { className } = this._buildClassName()
        const stylesBuffer = this._adonis.getStylesBuffer()
        if (this._shouldInjectCSS()) {
          stylesBuffer.bufferRulesets(stylesManager.generateCSS())

          if (injection === true && !hashedStyles) {
            stylesBuffer.flushToStyleTag()
          }
        }

        // If an available variation is passed in as a property, we add the styles to the class and
        // remove the prop from the props we pass to our target element
        if (isTag) {
          const { variations } = options
          Object.keys(variations || {})
            .forEach((variation) => {
              delete elementProps[variation]
            })
        }

        // We only need to pass the class name to tags, not to components
        if (isTag) {
          elementProps.className = className
        } else {
          elementProps.styles = stylesObject
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
    AdonisComponent.adonisTarget = target
    AdonisComponent.adonisStyles = stylesObject
    AdonisComponent.adonisBaseStyles = baseStyles

    return AdonisComponent
  }
}
