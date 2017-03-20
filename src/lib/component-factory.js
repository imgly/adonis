import React, { Component } from 'react'
import BaseAdonisComponent from './components/base-adonis-component'
import Styles from './styles/styles'
import StylesManager from './styles/styles-manager'

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

    class AdonisComponent extends BaseAdonisComponent {
      constructor (...args) {
        super(...args)

        const activeVariations = this._getActiveVariations()

        const { styles, variations, baseStyles } = options
        this._stylesObject = new Styles(adonis, { styles, variations, name })

        const allStyles = [baseStyles, this._stylesObject, this.props.styles].filter(s => s)
        this._stylesManager = new StylesManager(adonis, allStyles, activeVariations)
        this._adonis = adonis
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
       * Returns an array containing the active variations for this component
       * @return {String[]}
       * @private
       */
      _getActiveVariations () {
        const { variations } = options
        return Object.keys(variations || {})
          .filter((variation) => !!this.props[variation])
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
        classNames.push(this._stylesManager.getClassName())

        return { className: classNames.filter(c => c).join(' ') }
      }

      /**
       * Renders this component
       * @return {React.Element}
       */
      render () {
        const elementProps = this._cloneProps()

        const { className } = this._buildClassName()

        const { injection } = this._adonis.getOptions()
        if (injection === true) {
          const stylesBuffer = this._adonis.getStylesBuffer()
          stylesBuffer.bufferStyles(this._stylesManager.generateCSS())
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
          elementProps.styles = this._stylesObject
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

    return AdonisComponent
  }
}
