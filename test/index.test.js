import adonis, { StyleSheetServer, ThemeProvider, withTheme } from '../src'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

class SpecComponent extends React.Component {
  render () {
    return this.props.content
  }
}
SpecComponent.propTypes = {
  content: React.PropTypes.node.isRequired
}

const componentFactory = React.createFactory(SpecComponent)
const render = (content) => {
  return StyleSheetServer.renderStatic(() =>
    ReactDOMServer.renderToStaticMarkup(componentFactory({ content }))
  )
}

describe('adonis', () => {
  describe('rendering an adonis component', () => {
    it('should render correctly', () => {
      const Wrapper = adonis.div({
        background: 'red',
        padding: '5px'
      })
      const content = <Wrapper />
      const { html, css } = render(content)

      html.should.equal('<div class="div_tcorpq"></div>')
      css.content.should.equal(`.div_tcorpq{background:red;padding:5px;}`)
    })
  })

  describe('overriding styles of an adonis component', () => {
    it('should render correctly', () => {
      const Wrapper = adonis.div({
        background: 'red',
        padding: '5px'
      })
      const OverriddenWrapper = adonis(Wrapper)({
        background: 'blue'
      })
      const content = <OverriddenWrapper />
      const { html, css } = render(content)

      html.should.equal('<div class="div_tcorpq-o_O-AdonisComponent_1nxhvta"></div>')
      css.content.should.equal(`.AdonisComponent_1nxhvta{background:blue;}.div_tcorpq-o_O-AdonisComponent_1nxhvta{background:blue;padding:5px;}`)
    })
  })

  describe('overriding styles of a React component with an adonis component', () => {
    it('should render correctly', () => {
      class Button extends React.Component {
        render () {
          return (<ButtonElement styles={this.props.styles}>{this.props.caption}</ButtonElement>)
        }
      }
      const ButtonElement = adonis.div({
        border: '1px solid red',
        padding: '10px 5px'
      })
      const PrimaryButton = adonis(Button)({
        background: 'blue'
      })
      const content = <PrimaryButton />
      const { html, css } = render(content)

      html.should.equal('<div class="div_1k8vrzz-o_O-Button_1nxhvta"></div>')
      css.content.should.equal(`.Button_1nxhvta{background:blue;}.div_1k8vrzz-o_O-Button_1nxhvta{border:1px solid red;padding:10px 5px;background:blue;}`)
    })
  })

  describe('variations', () => {
    describe('when passing variation styles and a variation flag', () => {
      it('should render correctly', () => {
        class App extends React.Component {
          render () {
            return <Button primary />
          }
        }

        const Button = adonis.div({
          border: '1px solid black',
          padding: '10px 5px'
        }, {
          primary: {
            background: 'blue'
          }
        })

        const content = <App />
        const { html, css } = render(content)

        html.should.equal('<div class="div_18550lg-o_O-primary_1nxhvta"></div>')
        css.content.should.equal(`.div_18550lg-o_O-primary_1nxhvta{border:1px solid black;padding:10px 5px;background:blue;}`)
      })
    })
  })

  describe('theming', () => {
    describe('when wrapping a component in a ThemeProvider', () => {
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
          backgroundColor: theme => theme.buttonBackgroundColor
        })

        const content = <ThemeProvider theme={theme}><App /></ThemeProvider>
        const { html, css } = render(content)

        html.should.equal(`<div class="div_fus06d"></div>`)
        css.content.should.equal(`.div_fus06d{background-color:grey;}`)
      })
    })
  })
})
