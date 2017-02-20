import adonis, { StyleSheetServer } from '../src'
import { shallow } from 'enzyme'
import jsdom from 'mocha-jsdom'
import React from 'react'

const render = (content) => {
  return StyleSheetServer.renderStatic(() =>
    shallow(content).html()
  )
}

describe('adonis', () => {
  describe('extensions', () => {
    describe('immediate child selectors', () => {
      jsdom()

      it('should render correctly', () => {
        const Wrapper = adonis.div({
          background: 'red',
          '> h1': {
            color: 'red'
          }
        })
        const content = <Wrapper />
        const { html, css } = render(content)

        html.should.equal('<div class="div_1ehru9u"></div>')
        css.content.should.equal(`.div_1ehru9u{background:red;}.div_1ehru9u>h1{color:red;}`)
      })
    })

    describe('self selector', () => {
      jsdom()

      it('should render correctly', () => {
        const Wrapper = adonis.div({
          background: 'red',
          '& h1, h2, h3': {
            color: 'red'
          }
        })
        const content = <Wrapper />
        const { html, css } = render(content)

        html.should.equal('<div class="div_1i24nhp"></div>')
        css.content.should.equal(`.div_1i24nhp{background:red;}.div_1i24nhp h1,.div_1i24nhp h2,.div_1i24nhp h3{color:red;}`)
      })
    })
  })
})
