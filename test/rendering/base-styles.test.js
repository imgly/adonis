import Adonis from '../../src'
import React from 'react'
import jsdom from 'mocha-jsdom'
import { render } from '../utils'

const adonis = new Adonis()
describe('defining and extending base styles', () => {
  jsdom()
  it('should render correctly', () => {
    const PrimaryBackgroundColor = adonis.css({
      backgroundColor: 'blue'
    })

    const Button = adonis(PrimaryBackgroundColor).button({
      cursor: 'pointer'
    })
    const { html, css } = render(adonis, <Button />)

    html.should.equal(`<button class="baseStyles_1b2uzpk-o_O-button_ro0g1e"></button>`)
    css.content.should.equal(`.baseStyles_1b2uzpk-o_O-button_ro0g1e {\n  background-color: blue;\n  cursor: pointer;\n}`)
  })

  describe('when passing a name', () => {
    it('should combine the two classes', () => {
      const PrimaryBackgroundColor = adonis.css({
        backgroundColor: 'blue'
      }, 'PrimaryBackgroundColor')

      const Button = adonis(PrimaryBackgroundColor).button({
        cursor: 'pointer'
      }, 'Button')
      const { html, css } = render(adonis, <Button />)

      html.should.equal(`<button class="PrimaryBackgroundColor_1b2uzpk-o_O-Button_ro0g1e"></button>`)
      css.content.should.equal(`.PrimaryBackgroundColor_1b2uzpk-o_O-Button_ro0g1e {\n  background-color: blue;\n  cursor: pointer;\n}`)
    })
  })
})
