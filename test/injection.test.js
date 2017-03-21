import Adonis from '../src'
import React from 'react'
import jsdom from 'mocha-jsdom'
import { mount } from 'enzyme'

let adonis, styleNode
describe('injection', () => {
  jsdom()
  beforeEach(() => {
    styleNode = document.createElement('style')
    styleNode.setAttribute('data-adonis', true)
    document.head.appendChild(styleNode)
  })

  describe('set to `pre`', () => {
    beforeEach(() => {
      adonis = new Adonis({
        injection: 'pre',
        styleNode
      })
    })

    it('should inject the styles before rendering', () => {
      adonis.div({
        background: 'red',
        padding: '5px'
      })

      styleNode.innerHTML.should.equal('.div~tcorpq {\n  background: red;\n  padding: 5px;\n}')
    })

    it('should not inject styles on render', () => {
      const Wrapper = adonis.div({
        background: 'red',
        padding: '5px'
      })

      const css = '.div~tcorpq {\n  background: red;\n  padding: 5px;\n}'

      styleNode.innerHTML.should.equal(css)
      mount(<Wrapper />)
      styleNode.innerHTML.should.equal(css)
    })

    describe('when multiple variations are given', () => {
      it('should pre-render all possible variation combinations', () => {
        adonis.div({
          background: 'red'
        }, {
          active: {
            background: 'blue',
            color: 'white'
          },
          disabled: {
            opacity: '0.5'
          }
        })

        styleNode.innerHTML.should.equal('.div~10ip45p {\n  background: red;\n}\n\n.div~10ip45p--active~1o2wtm6 {\n  background: blue;\n  color: white;\n}\n\n.div~10ip45p--disabled~cyntia {\n  background: red;\n  opacity: 0.5;\n}\n\n.div~10ip45p--active~1o2wtm6--disabled~cyntia {\n  background: blue;\n  color: white;\n  opacity: 0.5;\n}')
      })
    })

    describe('when extending an adonis component', () => {
      it('should correctly generate the css', () => {
        const Wrapper = adonis.div({
          background: 'red',
          padding: '5px'
        })
        adonis(Wrapper)({
          background: 'blue'
        })

        styleNode.innerHTML.should.equal('.div~tcorpq {\n  background: red;\n  padding: 5px;\n}\n\n.div~tcorpq__AdonisComponent~1nxhvta {\n  background: blue;\n  padding: 5px;\n}')
      })
    })

    describe('when extending a react component that has a root element', () => {
      it('should correctly generate the css', () => {
        class Component extends React.Component {
          render () {
            const { RootElement } = this.constructor
            return <RootElement styles={this.props.styles} />
          }
        }
        Component.RootElement = adonis.div({
          background: 'red',
          padding: '5px'
        })

        adonis(Component)({
          background: 'blue'
        })

        styleNode.innerHTML.should.equal('.div~tcorpq {\n  background: red;\n  padding: 5px;\n}\n\n.div~tcorpq__Component~1nxhvta {\n  background: blue;\n  padding: 5px;\n}')
      })
    })
  })

  describe('set to `true`', () => {
    beforeEach(() => {
      adonis = new Adonis({
        injection: true,
        styleNode
      })
    })

    it('should not inject the styles before rendering', () => {
      adonis.div({
        background: 'red',
        padding: '5px'
      })

      styleNode.innerHTML.should.equal('')
    })

    it('should inject styles on render', () => {
      const Wrapper = adonis.div({
        background: 'red',
        padding: '5px'
      })

      styleNode.innerHTML.should.equal('')
      mount(<Wrapper />)
      styleNode.innerHTML.should.equal('.div~tcorpq {\n  background: red;\n  padding: 5px;\n}')
    })
  })

  describe('set to `false`', () => {
    beforeEach(() => {
      adonis = new Adonis({
        injection: false,
        styleNode
      })
    })

    it('should not inject the styles before rendering', () => {
      adonis.div({
        background: 'red',
        padding: '5px'
      })

      styleNode.innerHTML.should.equal('')
    })

    it('should not inject styles on render', () => {
      const Wrapper = adonis.div({
        background: 'red',
        padding: '5px'
      })

      styleNode.innerHTML.should.equal('')
      mount(<Wrapper />)
      styleNode.innerHTML.should.equal('')
    })
  })
})
