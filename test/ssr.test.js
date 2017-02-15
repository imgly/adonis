import adonis, { StyleSheetServer, preRenderCSS } from '../src'
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

    describe('theming', () => {
      it('should render correctly', () => {
        const theme = { textColor: 'red', backgroundColor: 'blue' }
        const css = preRenderCSS(theme, () => {
          const Wrapper = adonis.div({
            color: theme => theme.textColor
          })

          adonis(Wrapper)({
            background: theme => theme.backgroundColor
          })
        })

        css.content.should.equal(`.div_120drhm{color:red;}.div_120drhm-o_O-AdonisComponent_120drhm{color:red;background:blue;}`)
      })
    })
  })
})
