import adonis, { StyleSheetServer, ThemeProvider, withTheme, preRenderCSS } from '../src'
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
      css.content.should.equal(`.div_ldei0g > * {background:red;}`)
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

        html.should.equal(`<div class="div_12v0gjx"></div>`)
        css.content.should.equal(`.div_12v0gjx{background-color:grey;color:blue;}`)
      })
    })
  })

  describe('server-side rendering', () => {
    describe('initial styles', () => {
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

    describe('styles that are not rendered initially', () => {
      it('should render correctly', () => {
        const css = preRenderCSS(() => {
          adonis.div({
            background: 'red',
            padding: '5px'
          })
        })

        css.content.should.equal(`.div_tcorpq{background:red;padding:5px;}`)
      })

      describe('with variations', () => {
        it('should render all possible combinations', () => {
          const css = preRenderCSS(() => {
            adonis.div({
              background: 'red',
              padding: '5px'
            }, {
              variation1: { color: 'red' },
              variation2: { background: 'blue' }
            })
          })

          css.content.should.equal(`.div_tcorpq{background:red;padding:5px;}.div_tcorpq-o_O-variation1_im3wl1{background:red;padding:5px;color:red;}.div_tcorpq-o_O-variation2_1nxhvta{background:blue;padding:5px;}.div_tcorpq-o_O-variation1_im3wl1-o_O-variation2_1nxhvta{background:blue;padding:5px;color:red;}`)
        })
      })

      describe('when styling a react component', () => {
        it('should render correctly', function () {
          const css = preRenderCSS(() => {
            class Wrapper extends React.Component {
              render () {
                const { RootElement } = this.constructor
                return <RootElement styles={this.props.styles} />
              }
            }

            Wrapper.RootElement = adonis.div({
              color: 'red'
            })

            adonis(Wrapper)({
              background: 'blue'
            })
          })

          css.content.should.equal(`.div_im3wl1{color:red;}.div_im3wl1-o_O-Wrapper_1nxhvta{color:red;background:blue;}`)
        })

        describe('that has a deeply styled adonis component', () => {
          it('should render correctly', () => {
            const css = preRenderCSS(() => {
              class Wrapper extends React.Component {
                render () {
                  const { RootElement } = this.constructor
                  return <RootElement styles={this.props.styles} />
                }
              }

              const BaseWrapper = adonis.div({
                border: '1px solid red'
              })

              Wrapper.RootElement = adonis(BaseWrapper)({
                color: 'red'
              })

              adonis(Wrapper)({
                background: 'blue'
              })
            })

            css.content.should.equal(`.div_1cqh1i4{border:1px solid red;}.div_1cqh1i4-o_O-AdonisComponent_im3wl1{border:1px solid red;color:red;}.AdonisComponent_im3wl1-o_O-div_1cqh1i4-o_O-Wrapper_1nxhvta{color:red;border:1px solid red;background:blue;}`)
          })
        })
      })

      describe('when styling an adonis component', () => {
        it('should render correctly', () => {
          const css = preRenderCSS(() => {
            const Wrapper = adonis.div({
              color: 'red'
            })

            adonis(Wrapper)({
              background: 'blue'
            })
          })

          css.content.should.equal(`.div_im3wl1{color:red;}.div_im3wl1-o_O-AdonisComponent_1nxhvta{color:red;background:blue;}`)
        })
      })
    })
  })
})
