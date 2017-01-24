import React from 'react'

export default (Component) => {
  class ComponentWithTheme extends React.Component {
    render () {
      return <Component {...this.props} />
    }
  }

  ComponentWithTheme.contextTypes = {
    theme: React.PropTypes.object
  }

  return ComponentWithTheme
}
