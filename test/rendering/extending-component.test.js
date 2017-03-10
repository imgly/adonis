import Adonis from '../../src'
import React from 'react'
import jsdom from 'mocha-jsdom'
import { render } from '../utils'

const adonis = new Adonis()
describe('extending a React component with an adonis component as root element', () => {
  jsdom()
  it('should render correctly', () => {
    class Button extends React.Component {
      render () {
        const { RootElement } = this.constructor
        return (<RootElement styles={this.props.styles}>{this.props.caption}</RootElement>)
      }
    }
    Button.RootElement = adonis.div({
      border: '1px solid red',
      padding: '10px 5px'
    })

    const PrimaryButton = adonis(Button)({
      background: 'blue'
    })
    const { html, css } = render(adonis, <PrimaryButton />)

    html.should.equal('<div class="div~1k8vrzz__Button~1nxhvta"></div>')
    css.content.should.equal(`.Button~1nxhvta {\n  background: blue;\n}\n\n.div~1k8vrzz__Button~1nxhvta {\n  border: 1px solid red;\n  padding: 10px 5px;\n  background: blue;\n}`)
  })

  describe('when passing a name', () => {
    it('should render correctly', () => {
      class Button extends React.Component {
        render () {
          const { RootElement } = this.constructor
          return (<RootElement styles={this.props.styles}>{this.props.caption}</RootElement>)
        }
      }
      Button.RootElement = adonis.div({
        border: '1px solid red',
        padding: '10px 5px'
      }, 'Button')

      const PrimaryButton = adonis(Button)({
        background: 'blue'
      }, 'PrimaryButton')
      const { html, css } = render(adonis, <PrimaryButton />)

      html.should.equal('<div class="Button~1k8vrzz__PrimaryButton~1nxhvta"></div>')
      css.content.should.equal(`.PrimaryButton~1nxhvta {\n  background: blue;\n}\n\n.Button~1k8vrzz__PrimaryButton~1nxhvta {\n  border: 1px solid red;\n  padding: 10px 5px;\n  background: blue;\n}`)
    })
  })
})
