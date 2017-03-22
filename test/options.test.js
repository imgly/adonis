import Adonis from '../src'
import React from 'react'
import jsdom from 'mocha-jsdom'
import { render } from './utils'

let adonis
describe('options', () => {
  describe('`minified` option', () => {
    jsdom()
    describe('when set to `true`', () => {
      beforeEach(() => {
        adonis = new Adonis({
          minified: true
        })
      })

      it('should minify the output', () => {
        const PrimaryBackgroundColor = adonis.css({
          backgroundColor: 'blue'
        })

        const Button = adonis(PrimaryBackgroundColor).button({
          cursor: 'pointer'
        })
        const { html, css } = render(adonis, <Button />)

        html.should.equal(`<button class="baseStyles-1b2uzpk__button-ro0g1e"></button>`)
        css.content.should.equal(`.baseStyles-1b2uzpk__button-ro0g1e{background-color:blue;cursor:pointer;}`)
      })
    })
  })

  describe('`injection` option', () => {
    jsdom()
    describe('when set to `false`', () => {
      beforeEach(() => {
        adonis = new Adonis({
          injection: false
        })
      })

      it('should not inject any css', () => {
        const PrimaryBackgroundColor = adonis.css({
          backgroundColor: 'blue'
        })

        const Button = adonis(PrimaryBackgroundColor).button({
          cursor: 'pointer'
        })
        const { html, css } = render(adonis, <Button />)

        html.should.equal(`<button class="baseStyles-1b2uzpk__button-ro0g1e"></button>`)
        css.content.should.equal('')
      })
    })
  })

  describe('`autoPrefix` option', () => {
    jsdom()
    describe('when set to `false`', () => {
      beforeEach(() => {
        adonis = new Adonis({
          autoPrefix: true
        })
      })

      it('should automaticaly prefix css properties when necessary', () => {
        const UserSelectTest = adonis.div({
          userSelect: 'none'
        })

        const { html, css } = render(adonis, <UserSelectTest />)

        html.should.equal(`<div class="div-smhzgc"></div>`)
        css.content.should.equal('.div-smhzgc {\n  user-select: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n}')
      })
    })
  })

  describe('`selectorPrefix` option', () => {
    jsdom()
    describe('when set to `adonis-`', () => {
      beforeEach(() => {
        adonis = new Adonis({
          selectorPrefix: 'adonis-'
        })
      })

      it('should prefix css selectors', () => {
        const PrimaryBackgroundColor = adonis.css({
          backgroundColor: 'blue'
        })

        const Button = adonis(PrimaryBackgroundColor).button({
          cursor: 'pointer'
        })
        const { html, css } = render(adonis, <Button />)

        html.should.equal(`<button class="adonis-baseStyles-1b2uzpk__button-ro0g1e"></button>`)
        css.content.should.equal('.adonis-baseStyles-1b2uzpk__button-ro0g1e {\n  background-color: blue;\n  cursor: pointer;\n}')
      })
    })
  })

  describe('`hashSeparator` option', () => {
    jsdom()
    describe('when set to `foo`', () => {
      beforeEach(() => {
        adonis = new Adonis({
          hashSeparator: 'foo'
        })
      })

      it('should generate the correct class names and selectors', () => {
        const PrimaryBackgroundColor = adonis.css({
          backgroundColor: 'blue'
        })

        const Button = adonis(PrimaryBackgroundColor).button({
          cursor: 'pointer'
        })
        const { html, css } = render(adonis, <Button />)

        html.should.equal(`<button class="baseStylesfoo1b2uzpk__buttonfooro0g1e"></button>`)
        css.content.should.equal('.baseStylesfoo1b2uzpk__buttonfooro0g1e {\n  background-color: blue;\n  cursor: pointer;\n}')
      })
    })
  })

  describe('`nameSeparator` option', () => {
    jsdom()
    describe('when set to `foo`', () => {
      beforeEach(() => {
        adonis = new Adonis({
          nameSeparator: 'foo'
        })
      })

      it('should generate the correct class names and selectors', () => {
        const PrimaryBackgroundColor = adonis.css({
          backgroundColor: 'blue'
        })

        const Button = adonis(PrimaryBackgroundColor).button({
          cursor: 'pointer'
        })
        const { html, css } = render(adonis, <Button />)

        html.should.equal(`<button class="baseStyles-1b2uzpkfoobutton-ro0g1e"></button>`)
        css.content.should.equal('.baseStyles-1b2uzpkfoobutton-ro0g1e {\n  background-color: blue;\n  cursor: pointer;\n}')
      })
    })
  })

  describe('`variationSeparator` option', () => {
    jsdom()
    describe('when set to `foo`', () => {
      beforeEach(() => {
        adonis = new Adonis({
          variationSeparator: 'foo'
        })
      })

      it('should generate the correct class names and selectors', () => {
        const Button = adonis.button({
          backgroundColor: 'blue'
        }, {
          active: {
            backgroundColor: 'red'
          }
        })

        const { html, css } = render(adonis, <Button active />)

        html.should.equal(`<button class="button-1b2uzpkfooactive-1wtftbl"></button>`)
        css.content.should.equal('.button-1b2uzpkfooactive-1wtftbl {\n  background-color: red;\n}')
      })
    })
  })

  describe('`hashedStyles` option', () => {
    jsdom()
    describe('when set to `true`', () => {
      beforeEach(() => {
        adonis = new Adonis({
          hashedStyles: true
        })
      })

      describe('when passing hashes instead of style objects', () => {
        it('should not inject any css', () => {
          const Button = adonis.button('1b2uzpk', {
            active: '1wtftbl'
          })

          const { css } = render(adonis, <Button active />)

          css.content.should.equal('')
        })

        it('should correctly generate class names', () => {
          const Button = adonis.button('1b2uzpk', {
            active: '1wtftbl'
          })

          const { html } = render(adonis, <Button active />)

          html.should.equal(`<button class="button-1b2uzpk--active-1wtftbl"></button>`)
        })
      })

      describe('when passing style objects instead of hashes', () => {
        it('should throw an error', () => {
          const throwable = () => {
            adonis.button({
              backgroundColor: 'blue'
            }, {
              active: {
                backgroundColor: 'red'
              }
            })
          }

          throwable.should.throw('Passing style objects with `hashedStyles` set to true is invalid.')
        })
      })
    })
  })
})
