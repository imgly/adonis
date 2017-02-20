import adonis, { StyleSheetServer, ThemeProvider, withTheme } from '../src'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

require('mocha-sinon')

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

    describe('with name given', () => {
      it('should render correctly', () => {
        const Wrapper = adonis.div({
          background: 'red',
          padding: '5px'
        }, 'Wrapper')
        const content = <Wrapper />
        const { html, css } = render(content)

        html.should.equal('<div class="Wrapper_tcorpq"></div>')
        css.content.should.equal(`.Wrapper_tcorpq{background:red;padding:5px;}`)
      })
    })

    describe('when passing an additional class name', () => {
      it('should render correctly', () => {
        const Wrapper = adonis.div({
          background: 'red',
          padding: '5px'
        }, 'Wrapper')
        const content = <Wrapper className='foo' />
        const { html, css } = render(content)

        html.should.equal('<div class="foo Wrapper_tcorpq"></div>')
        css.content.should.equal(`.Wrapper_tcorpq{background:red;padding:5px;}`)
      })
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

    describe('with name given', () => {
      it('should render correctly', () => {
        const Wrapper = adonis.div({
          background: 'red',
          padding: '5px'
        }, 'Wrapper')
        const OverriddenWrapper = adonis(Wrapper)({
          background: 'blue'
        }, 'OverriddenWrapper')
        const content = <OverriddenWrapper />
        const { html, css } = render(content)

        html.should.equal('<div class="Wrapper_tcorpq-o_O-OverriddenWrapper_1nxhvta"></div>')
        css.content.should.equal(`.OverriddenWrapper_1nxhvta{background:blue;}.Wrapper_tcorpq-o_O-OverriddenWrapper_1nxhvta{background:blue;padding:5px;}`)
      })
    })
  })

  describe('overriding styles of a React component with an adonis component', () => {
    it('should render correctly', () => {
      class Button extends React.Component {
        render () {
          const { RootElement } = this.constructor
          return (<RootElement styles={this.props.styles}>{this.props.caption}</RootElement>)
        }
      }
      Button.RootElement = adonis.div({
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

    describe('with name given', () => {
      it('should render correctly', () => {
        class Button extends React.Component {
          render () {
            const { RootElement } = this.constructor
            return (<RootElement styles={this.props.styles}>{this.props.caption}</RootElement>)
          }
        }
        Button.RootElement = adonis.div({
          border: '1px solid red',
          padding: '10px 5px'
        }, 'Button')
        const PrimaryButton = adonis(Button)({
          background: 'blue'
        }, 'PrimaryButton')
        const content = <PrimaryButton />
        const { html, css } = render(content)

        html.should.equal('<div class="Button_1k8vrzz-o_O-PrimaryButton_1nxhvta"></div>')
        css.content.should.equal(`.PrimaryButton_1nxhvta{background:blue;}.Button_1k8vrzz-o_O-PrimaryButton_1nxhvta{border:1px solid red;padding:10px 5px;background:blue;}`)
      })
    })
  })

  describe('variations', () => {
    describe('when passing variation styles and a variation flag', () => {
      it('should render correctly', () => {
        class App extends React.Component {
          render () {
            return <Button primary red={false} />
          }
        }

        const Button = adonis.div({
          border: '1px solid black',
          padding: '10px 5px'
        }, {
          primary: {
            background: 'blue'
          },
          red: {
            background: 'red'
          }
        })

        const content = <App />
        const { html, css } = render(content)

        html.should.equal('<div class="div_18550lg-o_O-primary_1nxhvta"></div>')
        css.content.should.equal(`.div_18550lg-o_O-primary_1nxhvta{border:1px solid black;padding:10px 5px;background:blue;}`)
      })

      describe('with name given', () => {
        it('should render correctly', () => {
          class App extends React.Component {
            render () {
              return <Button primary red={false} />
            }
          }

          const Button = adonis.div({
            border: '1px solid black',
            padding: '10px 5px'
          }, {
            primary: {
              background: 'blue'
            },
            red: {
              background: 'red'
            }
          }, 'Button')

          const content = <App />
          const { html, css } = render(content)

          html.should.equal('<div class="Button_18550lg-o_O-primary_1nxhvta"></div>')
          css.content.should.equal(`.Button_18550lg-o_O-primary_1nxhvta{border:1px solid black;padding:10px 5px;background:blue;}`)
        })
      })
    })

    describe('when passing multiple variation styles flags', () => {
      it('should render variations in alphabetical order', () => {
        class App extends React.Component {
          render () {
            return <Button red primary />
          }
        }

        const Button = adonis.div({
          border: '1px solid black',
          padding: '10px 5px'
        }, {
          red: {
            background: 'red'
          },
          primary: {
            background: 'blue'
          }
        })

        const content = <App />
        const { html, css } = render(content)

        html.should.equal('<div class="div_18550lg-o_O-primary_1nxhvta-o_O-red_10ip45p"></div>')
        css.content.should.equal(`.div_18550lg-o_O-primary_1nxhvta-o_O-red_10ip45p{border:1px solid black;padding:10px 5px;background:red;}`)
      })
    })
  })

  describe('base styles without tag name', () => {
    it('should combine the two classes', () => {
      const PrimaryBackgroundColor = adonis.css({
        backgroundColor: 'blue'
      })

      const Button = adonis(PrimaryBackgroundColor).button({
        cursor: 'pointer'
      })

      const content = <Button />
      const { html, css } = render(content)

      html.should.equal(`<button class="baseStyles_1b2uzpk-o_O-button_ro0g1e"></button>`)
      css.content.should.equal(`.baseStyles_1b2uzpk-o_O-button_ro0g1e{background-color:blue;cursor:pointer;}`)
    })

    describe('with name given', () => {
      it('should combine the two classes', () => {
        const PrimaryBackgroundColor = adonis.css({
          backgroundColor: 'blue'
        }, 'PrimaryBackgroundColor')

        const Button = adonis(PrimaryBackgroundColor).button({
          cursor: 'pointer'
        }, 'Button')

        const content = <Button />
        const { html, css } = render(content)

        html.should.equal(`<button class="PrimaryBackgroundColor_1b2uzpk-o_O-Button_ro0g1e"></button>`)
        css.content.should.equal(`.PrimaryBackgroundColor_1b2uzpk-o_O-Button_ro0g1e{background-color:blue;cursor:pointer;}`)
      })
    })
  })

  describe('immediate child selector', () => {
    it('should be supported', () => {
      const Button = adonis.div({
        '> *': {
          background: 'red'
        }
      })

      const content = <Button />
      const { html, css } = render(content)

      html.should.equal(`<div class="div_ldei0g"></div>`)
      css.content.should.equal(`.div_ldei0g>*{background:red;}`)
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
          backgroundColor: theme => theme.buttonBackgroundColor,
          color: 'blue'
        })

        const content = <ThemeProvider theme={theme}><App /></ThemeProvider>
        const { html, css } = render(content)

        html.should.equal(`<div class="div_hxfs3d"></div>`)
        css.content.should.equal(`.div_hxfs3d{background-color:grey;color:blue;}`)
      })
    })
  })
})
