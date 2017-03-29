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

    html.should.equal(`<button class="baseStyles-1b2uzpk__button-ro0g1e"></button>`)
    css.content.should.equal(`.baseStyles-1b2uzpk__button-ro0g1e {\n  background-color: blue;\n  cursor: pointer;\n}`)
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

      html.should.equal(`<button class="PrimaryBackgroundColor-1b2uzpk__Button-ro0g1e"></button>`)
      css.content.should.equal(`.PrimaryBackgroundColor-1b2uzpk__Button-ro0g1e {\n  background-color: blue;\n  cursor: pointer;\n}`)
    })
  })

  describe('with variations', () => {
    it('should render correctly', () => {
      const PrimaryBackgroundColor = adonis.css({
        backgroundColor: 'blue'
      }, {
        primary: {
          color: 'red'
        }
      }, 'PrimaryBackgroundColor')

      const Button = adonis(PrimaryBackgroundColor).button({
        cursor: 'pointer'
      }, 'Button')
      const { html, css } = render(adonis, <Button primary />)

      html.should.equal('<button class="PrimaryBackgroundColor-1b2uzpk--primary-im3wl1__Button-ro0g1e"></button>')
      css.content.should.equal('.PrimaryBackgroundColor-1b2uzpk--primary-im3wl1__Button-ro0g1e {\n  background-color: blue;\n  color: red;\n  cursor: pointer;\n}')
    })
  })
})
