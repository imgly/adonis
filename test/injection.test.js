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
        batchInjection: false,
        styleNode
      })
    })

    it('should inject the styles before rendering', () => {
      adonis.div({
        background: 'red',
        padding: '5px'
      })

      styleNode.innerHTML.should.equal('.div-tcorpq {\n  background: red;\n  padding: 5px;\n}')
    })

    it('should not inject styles on render', () => {
      const Wrapper = adonis.div({
        background: 'red',
        padding: '5px'
      })

      const css = '.div-tcorpq {\n  background: red;\n  padding: 5px;\n}'

      styleNode.innerHTML.should.equal(css)
      mount(<Wrapper />)
      styleNode.innerHTML.should.equal(css)
    })

    describe('sub-trees', () => {
      it('should also be applied to variations', () => {
        const Knob = adonis.div({
          ':before': {
            display: 'block'
          }
        }, 'Knob')

        adonis(Knob)({}, {
          'top-left': {
            top: 0,
            left: 0
          }
        }, 'CornerKnob')

        styleNode.innerHTML.should.equal('.Knob-hljvbz:before {\n  display: block;\n}\n\n.Knob-hljvbz__CornerKnob-120drhm:before {\n  display: block;\n}\n\n.Knob-hljvbz__CornerKnob-120drhm--top-left-idqzrk {\n  top: 0;\n  left: 0;\n}\n\n.Knob-hljvbz__CornerKnob-120drhm--top-left-idqzrk:before {\n  display: block;\n}')
      })
    })

    describe('with theme', () => {
      beforeEach(() => {
        adonis = new Adonis({
          injection: 'pre',
          theme: {
            redColor: 'red'
          },
          styleNode,
          batchInjection: false
        })
      })

      it('should rener correctly', () => {
        adonis.div({
          background: theme => theme.redColor,
          padding: '5px'
        })

        styleNode.innerHTML.should.equal('.div-1y8a5z5 {\n  background: red;\n  padding: 5px;\n}')
      })
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

        styleNode.innerHTML.should.equal('.div-10ip45p {\n  background: red;\n}\n\n.div-10ip45p--active-1o2wtm6 {\n  background: blue;\n  color: white;\n}\n\n.div-10ip45p--disabled-cyntia {\n  background: red;\n  opacity: 0.5;\n}\n\n.div-10ip45p--active-1o2wtm6--disabled-cyntia {\n  background: blue;\n  color: white;\n  opacity: 0.5;\n}')
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

        styleNode.innerHTML.should.equal('.div-tcorpq {\n  background: red;\n  padding: 5px;\n}\n\n.div-tcorpq__div-1nxhvta {\n  background: blue;\n  padding: 5px;\n}')
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

        styleNode.innerHTML.should.equal('.div-tcorpq {\n  background: red;\n  padding: 5px;\n}\n\n.div-tcorpq__Component-1nxhvta {\n  background: blue;\n  padding: 5px;\n}')
      })
    })
  })

  describe('set to `true`', () => {
    beforeEach(() => {
      adonis = new Adonis({
        injection: true,
        styleNode,
        batchInjection: false
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
      styleNode.innerHTML.should.equal('.div-tcorpq {\n  background: red;\n  padding: 5px;\n}')
    })
  })

  describe('when rendering multiple components', () => {
    beforeEach(() => {
      adonis = new Adonis({
        styleNode
      })
    })

    it('should batch style injections', (done) => {
      const ButtonA = adonis.div({
        background: 'red'
      }, 'ButtonA')
      const ButtonB = adonis.div({
        background: 'blue'
      }, 'ButtonB')

      mount(<div><ButtonA /><ButtonB /></div>)
      global.setImmediate(() => {
        styleNode.innerHTML.should.equal('.ButtonA-10ip45p {\n  background: red;\n}\n\n.ButtonB-1nxhvta {\n  background: blue;\n}')
        styleNode.childNodes.length.should.equal(1)
        done()
      })
    })
  })

  describe('when rendering the same component multiple times', () => {
    beforeEach(() => {
      adonis = new Adonis({
        styleNode,
        batchInjection: false
      })
    })

    it('should not inject the same class twice', () => {
      const ButtonA = adonis.div({
        background: 'red'
      }, 'ButtonA')

      mount(<div><ButtonA /><ButtonA /></div>)
      styleNode.innerHTML.should.equal('.ButtonA-10ip45p {\n  background: red;\n}')
    })
  })

  describe('set to `false`', () => {
    beforeEach(() => {
      adonis = new Adonis({
        injection: false,
        styleNode,
        batchInjection: false
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
