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
    let { name } = options
    if (!name) name = this._getName(target)

    const { styles, variations, baseStyles } = options
    const stylesObject = new Styles(this._adonis, { styles, variations, name })

    const allStyles = [baseStyles, stylesObject].filter((s) => s)
    const stylesManager = new StylesManager(this._adonis, allStyles)

    const isTag = typeof target === 'string'
    const isAdonisComponent = target.prototype instanceof BaseAdonisComponent
    const isComponent = !isAdonisComponent && target.prototype instanceof Component

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
        return Object.keys(variations || {})
          .filter((variation) => !!this.props[variation])
      }

      /**
       * Builds the class name for this component
       * @return {String}
       * @private
       */
      _buildClassName () {
        const { styles: passedStyles, className: passedClassName } = this.props

        const activeVariations = this._getActiveVariations()

        const classNames = passedClassName ? [passedClassName] : []

        const { className, styles } = stylesManager.getClassName(activeVariations)
        classNames.push(className)

        return classNames.join(' ')
      }

      /**
       * Renders this component
       * @return {React.Element}
       */
      render () {
        const { children } = this.props

        const elementProps = this._cloneProps()
        elementProps.className = this._buildClassName()
        return React.createElement(target, elementProps, children)
      }
    }

    return AdonisComponent
  }
}
