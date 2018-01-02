import Adonis from '../../src'
import React from 'react'
import jsdom from 'mocha-jsdom'
import { render } from '../utils'

const adonis = new Adonis()
describe('extending an adonis component', () => {
  jsdom()
  it('should render correctly', () => {
    const Wrapper = adonis.div({
      background: 'red',
      padding: '5px'
    })
    const OverriddenWrapper = adonis(Wrapper)({
      background: 'blue'
    })
    const { html, css } = render(adonis, <OverriddenWrapper />)

    html.should.equal('<div class="div-tcorpq__div-1nxhvta"></div>')
    css.content.should.equal(`.div-tcorpq__div-1nxhvta {\n  background: blue;\n  padding: 5px;\n}`)
  })

  describe('when passing a name', () => {
    it('should render correctly', () => {
      const Wrapper = adonis.div({
        background: 'red',
        padding: '5px'
      }, 'Wrapper')
      const OverriddenWrapper = adonis(Wrapper)({
        background: 'blue'
      }, 'OverriddenWrapper')
      const { html, css } = render(adonis, <OverriddenWrapper />)

      html.should.equal('<div class="Wrapper-tcorpq__OverriddenWrapper-1nxhvta"></div>')
      css.content.should.equal(`.Wrapper-tcorpq__OverriddenWrapper-1nxhvta {\n  background: blue;\n  padding: 5px;\n}`)
    })
  })
})
