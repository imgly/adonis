import Adonis from '../../src'
import React from 'react'
import jsdom from 'mocha-jsdom'
import { render } from '../utils'

const adonis = new Adonis()
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
    const { html, css } = render(content)

    html.should.equal(`<div class="div_hxfs3d"></div>`)
    css.content.should.equal(`.div_hxfs3d {\m  background-color: grey;\n  color: blue;\n}`)
  })
})
