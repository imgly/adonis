import React from 'react'

export default (ThemableComponent) => {
  class ComponentWithTheme extends React.Component {
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
     * Renders the component
     * @return {React.Element|React.Component}
     */
    render () {
      const elementProps = this._cloneProps()

      const { innerRef } = elementProps
      if (innerRef) {
        elementProps.ref = innerRef
      }
      delete elementProps.innerRef

      return <ThemableComponent {...elementProps} />
    }
  }

  ComponentWithTheme.contextTypes = {
    theme: React.PropTypes.object
  }

  return ComponentWithTheme
}
