import Adonis from '../../src'
import React from 'react'
import jsdom from 'mocha-jsdom'
import { render } from '../utils'

const adonis = new Adonis()
describe('extensions', () => {
  jsdom()

  describe('immediate child selectors', () => {
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
      css.content.should.equal(`.div_1ehru9u {\n  background: red;\n}\n.div_1ehru9u > h1 {\n  color: red;\n}`)
    })
  })

  describe('self selector', () => {
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
      css.content.should.equal(`.div_1i24nhp {\n  background: red;\n}\n.div_1i24nhp h1, .div_1i24nhp h2, .div_1i24nhp h3 {\n  color: red;\n}`)
    })
  })
})
