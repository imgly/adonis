import { Component } from 'react'
import PropTypes from 'prop-types'

export default class BaseAdonisComponent extends Component {}
BaseAdonisComponent.contextTypes = {
  theme: PropTypes.object
}
