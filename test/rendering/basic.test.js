import Adonis from '../../src'
import React from 'react'
import jsdom from 'mocha-jsdom'
import { render } from '../utils'

const adonis = new Adonis()
describe('adonis.tag({})', () => {
  jsdom()
  it('should render correctly', () => {
    const Wrapper = adonis.div({
      background: 'red',
      padding: '5px'
    })
    const { html, css } = render(adonis, <Wrapper />)

    html.should.equal('<div class="div-tcorpq"></div>')
    css.content.should.equal(`.div-tcorpq {\n  background: red;\n  padding: 5px;\n}`)
  })

  describe('when passing an additional class name', () => {
    it('should render correctly', () => {
      const Wrapper = adonis.div({
        background: 'red',
        padding: '5px'
      }, 'Wrapper')
      const { html, css } = render(adonis, <Wrapper className='foo' />)

      html.should.equal('<div class="foo Wrapper-tcorpq"></div>')
      css.content.should.equal(`.Wrapper-tcorpq {\n  background: red;\n  padding: 5px;\n}`)
    })
  })

  describe('when passing a name', () => {
    it('should render correctly', () => {
      const Wrapper = adonis.div({
        background: 'red',
        padding: '5px'
      }, 'Wrapper')
      const { html, css } = render(adonis, <Wrapper />)

      html.should.equal('<div class="Wrapper-tcorpq"></div>')
      css.content.should.equal(`.Wrapper-tcorpq {\n  background: red;\n  padding: 5px;\n}`)
    })
  })
})
