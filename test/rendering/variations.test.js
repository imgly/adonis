import Adonis from '../../src'
import React from 'react'
import jsdom from 'mocha-jsdom'
import { render } from '../utils'
import { mount } from 'enzyme'

let adonis = new Adonis()
let styleNode
describe('with variations', () => {
  jsdom()
  it('should render correctly', () => {
    class App extends React.Component {
      render () {
        return <Button primary red={false} />
      }
    }

    const Button = adonis.div({
      border: '1px solid black',
      padding: '10px 5px'
    }, {
      primary: {
        background: 'blue'
      },
      red: {
        background: 'red'
      }
    })
    const { html, css } = render(adonis, <App />)

    html.should.equal('<div class="div-18550lg--primary-1nxhvta"></div>')
    css.content.should.equal(`.div-18550lg--primary-1nxhvta {\n  border: 1px solid black;\n  padding: 10px 5px;\n  background: blue;\n}`)
  })

  describe('when passing a name', () => {
    it('should render correctly', () => {
      class App extends React.Component {
        render () {
          return <Button primary red={false} />
        }
      }

      const Button = adonis.div({
        border: '1px solid black',
        padding: '10px 5px'
      }, {
        primary: {
          background: 'blue'
        },
        red: {
          background: 'red'
        }
      }, 'Button')

      const { html, css } = render(adonis, <App />)

      html.should.equal('<div class="Button-18550lg--primary-1nxhvta"></div>')
      css.content.should.equal(`.Button-18550lg--primary-1nxhvta {\n  border: 1px solid black;\n  padding: 10px 5px;\n  background: blue;\n}`)
    })
  })
})

describe('with multiple variations passed to component', () => {
  jsdom()
  it('should render variations in alphabetical order', () => {
    class App extends React.Component {
      render () {
        return <Button red primary />
      }
    }

    const Button = adonis.div({
      border: '1px solid black',
      padding: '10px 5px'
    }, {
      red: {
        background: 'red'
      },
      primary: {
        background: 'blue'
      }
    })
    const { html, css } = render(adonis, <App />)

    html.should.equal('<div class="div-18550lg--primary-1nxhvta--red-10ip45p"></div>')
    css.content.should.equal(`.div-18550lg--primary-1nxhvta--red-10ip45p {\n  border: 1px solid black;\n  padding: 10px 5px;\n  background: red;\n}`)
  })
})

describe('when variations change', () => {
  jsdom()

  beforeEach(() => {
    styleNode = document.createElement('style')
    styleNode.setAttribute('data-adonis', true)
    document.head.appendChild(styleNode)

    adonis = new Adonis({
      styleNode
    })
  })

  it('should update the class name', () => {
    const Button = adonis.div({
      background: 'blue'
    }, {
      active: {
        background: 'red'
      }
    })

    const wrapper = mount(<Button />)
    const domNode = wrapper.getDOMNode()
    domNode.getAttribute('class').should.equal('div-1nxhvta')
    wrapper.setProps({ active: true })
    domNode.getAttribute('class').should.equal('div-1nxhvta--active-10ip45p')
  })
})
