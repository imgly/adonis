import Adonis, { withTheme, ThemeProvider } from '../../src'
import React from 'react'
import jsdom from 'mocha-jsdom'
import { mount } from '../utils'

let adonis = new Adonis()
describe('when wrapping a component in a ThemeProvider', () => {
  jsdom()
  it('styles should have access to the theme', () => {
    const theme = {
      buttonBackgroundColor: 'grey'
    }

    class AppComponent extends React.Component {
      render () {
        return <Button />
      }
    }
    const App = withTheme(AppComponent)

    const Button = adonis.div({
      backgroundColor: theme => theme.buttonBackgroundColor,
      color: 'blue'
    })

    const content = <ThemeProvider theme={theme}><App /></ThemeProvider>
    const { html, css } = mount(adonis, content)

    html.should.equal(`<div class="div-hxfs3d"></div>`)
    css.content.should.equal(`.div-hxfs3d {\n  background-color: grey;\n  color: blue;\n}`)
  })

  describe('when changing a theme value', () => {
    it('hashes should not change', () => {
      const theme = {
        buttonBackgroundColor: 'grey'
      }

      class AppComponent extends React.Component {
        render () {
          return <Button />
        }
      }
      const App = withTheme(AppComponent)

      const Button = adonis.div({
        backgroundColor: theme => theme.buttonBackgroundColor,
        color: 'blue'
      })

      const content = <ThemeProvider theme={theme}><App /></ThemeProvider>
      const { html, css } = mount(adonis, content)

      html.should.equal(`<div class="div-hxfs3d"></div>`)
      css.content.should.equal(`.div-hxfs3d {\n  background-color: grey;\n  color: blue;\n}`)

      theme.buttonBackgroundColor = 'green'

      const { html: newHtml, css: newCss } = mount(adonis, content)
      newHtml.should.equal(`<div class="div-hxfs3d"></div>`)
      newCss.content.should.equal(`.div-hxfs3d {\n  background-color: green;\n  color: blue;\n}`)
    })
  })
})
