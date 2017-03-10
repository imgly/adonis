import React, { Component } from 'react'
import BaseAdonisComponent from './components/base-adonis-component'
import CombinedRuleset from './styles/combined-ruleset'
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

    const { styles, variations, baseStyles } = options
    const stylesObject = new Styles(this._adonis, { styles, variations, name })

    const allStyles = [baseStyles, stylesObject].filter((s) => s)
    const stylesManager = new StylesManager(this._adonis, allStyles)

    const isTag = typeof target === 'string'
    const isAdonisComponent = target.prototype instanceof BaseAdonisComponent
    const isComponent = !isAdonisComponent && target.prototype instanceof Component

    class AdonisComponent extends BaseAdonisComponent {
      constructor (...args) {
        super(...args)

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
        return Object.keys(variations || {})
          .filter((variation) => !!this.props[variation])
      }

      /**
       * Builds the class name for this component
       * @return {String}
       * @private
       */
      _buildClassName () {
        const { styles: passedRulesets, className: passedClassName } = this.props

        const activeVariations = this._getActiveVariations()

        // We can pass additional class names to components
        const classNames = []
        classNames.push(passedClassName)

        // Generate a class name for this component
        const rulesets = stylesManager.getRulesets(activeVariations)
          .concat(passedRulesets)
          .filter(r => r)
        const combinedRuleset = new CombinedRuleset(this._adonis, rulesets)
        classNames.push(combinedRuleset.getClassName())

        return { rulesets, className: classNames.filter(c => c).join(' ') }
      }

      /**
       * Renders this component
       * @return {React.Element}
       */
      render () {
        const elementProps = this._cloneProps()

        const { className, rulesets } = this._buildClassName()

        // If an available variation is passed in as a property, we add the styles to the class and
        // remove the prop from the props we pass to our target element
        if (isTag) {
          Object.keys(variations || {})
            .forEach((variation) => {
              delete elementProps[variation]
            })
        }

        // We only need to pass the class name to tags, not to components
        if (isTag) {
          elementProps.className = className
        } else {
          elementProps.styles = rulesets
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
