import React, { Component, PropTypes } from 'react'

export default class ThemeProvider extends Component {
  getChildContext () {
    let context = {}
    for (let prop in this.context) {
      context[prop] = this.context
    }
    context.theme = this.props.theme
    return context
  }

  render () {
    if (!this.props.children) {
      return null
    }
    return React.Children.only(this.props.children)
  }
}

ThemeProvider.childContextTypes = {
  theme: PropTypes.object.isRequired
}

ThemeProvider.contextTypes = {
  theme: PropTypes.object
}
