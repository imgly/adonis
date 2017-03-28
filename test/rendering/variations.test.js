import Adonis from '../../src'
import React from 'react'
import jsdom from 'mocha-jsdom'
import sinon from 'sinon'
import { render } from '../utils'
import { mount } from 'enzyme'

let adonis = new Adonis()
let styleNode
describe('with variations', () => {
  jsdom()
  it('should render correctly', () => {
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
    const { html, css } = render(adonis, <Button primary red={false} />)

    html.should.equal('<div class="div-18550lg--primary-1nxhvta"></div>')
    css.content.should.equal(`.div-18550lg--primary-1nxhvta {\n  border: 1px solid black;\n  padding: 10px 5px;\n  background: blue;\n}`)
  })

  describe('when passing a name', () => {
    it('should render correctly', () => {
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

      const { html, css } = render(adonis, <Button primary red={false} />)

      html.should.equal('<div class="Button-18550lg--primary-1nxhvta"></div>')
      css.content.should.equal(`.Button-18550lg--primary-1nxhvta {\n  border: 1px solid black;\n  padding: 10px 5px;\n  background: blue;\n}`)
    })
  })
})

describe('with multiple variations passed to component', () => {
  jsdom()
  it('should render variations in alphabetical order', () => {
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
    const { html, css } = render(adonis, <Button red primary />)

    html.should.equal('<div class="div-18550lg--primary-1nxhvta--red-10ip45p"></div>')
    css.content.should.equal(`.div-18550lg--primary-1nxhvta--red-10ip45p {\n  border: 1px solid black;\n  padding: 10px 5px;\n  background: red;\n}`)
  })
})

describe('passing variations to extended components', () => {
  describe('with multiple levels of inheritance', () => {
    it('should apply variations of inherited objects', () => {
      const Base = adonis.div({})
      const Extended = adonis(Base)({}, {
        variation: {
          color: 'blue',
          border: '1px solid red'
        }
      })
      const MoreExtended = adonis(Extended)({}, {
        variation: {
          color: 'red',
          backgroundColor: 'blue'
        }
      })

      const { html, css } = render(adonis, <MoreExtended variation />)

      html.should.equal('<div class="div-120drhm__div-120drhm--variation-1ffa41k__div-120drhm--variation-1y3uwt9"></div>')
      css.content.should.equal('.div-120drhm__div-120drhm--variation-1ffa41k__div-120drhm--variation-1y3uwt9 {\n  color: red;\n  border: 1px solid red;\n  background-color: blue;\n}')
    })
  })

  describe('when variation does not exist on extended component', () => {
    beforeEach(() => {
      sinon.spy(console, 'error')
    })

    afterEach(() => {
      console.error.restore()
    })

    it('should not pass the variation to the tag', () => {
      const Base = adonis.div({})
      const Extended = adonis(Base)({}, {
        variation: {}
      })

      render(adonis, <Extended variation />)

      // React prints a warning when an invalid prop is passed to an element / tag
      console.error.should.not.be.called()
    })

    describe('with multiple levels of inheritance', () => {
      it('should not pass the variation to the tag', () => {
        const Base = adonis.div({})
        const Extended = adonis(Base)({})
        const MoreExtended = adonis(Extended)({}, {
          variation: {}
        })

        render(adonis, <MoreExtended variation />)

        // React prints a warning when an invalid prop is passed to an element / tag
        console.error.should.not.be.called()
      })
    })
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
