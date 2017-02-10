import adonis from '../src/no-object-styles'
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
const render = (content) => ReactDOMServer.renderToStaticMarkup(componentFactory({ content }))

describe('when passing hashes instead of style objects', () => {
  describe('rendering an adonis component', () => {
    it('should render correctly', () => {
      const Wrapper = adonis.div('tcorpq')
      const content = <Wrapper />
      const html = render(content)

      html.should.equal('<div class="div_tcorpq"></div>')
    })
  })

  describe('overriding styles of an adonis component', () => {
    it('should render correctly', () => {
      const Wrapper = adonis.div('tcorpq')
      const OverriddenWrapper = adonis(Wrapper)('1nxhvta')
      const content = <OverriddenWrapper />
      const html = render(content)

      html.should.equal('<div class="div_tcorpq-o_O-AdonisComponent_1nxhvta"></div>')
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
      Button.RootElement = adonis.div('1k8vrzz')
      const PrimaryButton = adonis(Button)('1nxhvta')
      const content = <PrimaryButton />
      const html = render(content)

      html.should.equal('<div class="div_1k8vrzz-o_O-Button_1nxhvta"></div>')
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

        const Button = adonis.div('18550lg', {
          primary: '1nxhvta',
          red: '10ip45p'
        })

        const content = <App />
        const html = render(content)

        html.should.equal('<div class="div_18550lg-o_O-primary_1nxhvta"></div>')
      })
    })

    describe('when passing multiple variation styles flags', () => {
      it('should render variations in alphabetical order', () => {
        class App extends React.Component {
          render () {
            return <Button red primary />
          }
        }

        const Button = adonis.div('18550lg', {
          red: '10ip45p',
          primary: '1nxhvta'
        })

        const content = <App />
        const html = render(content)

        html.should.equal('<div class="div_18550lg-o_O-primary_1nxhvta-o_O-red_10ip45p"></div>')
      })
    })
  })

  describe('base styles without tag name', () => {
    it('should combine the two classes', () => {
      const PrimaryBackgroundColor = adonis.css('1b2uzpk')

      const Button = adonis(PrimaryBackgroundColor).button('ro0g1e')

      const content = <Button />
      const html = render(content)
      html.should.equal(`<button class="baseStyles_1b2uzpk-o_O-button_ro0g1e"></button>`)
    })
  })

  describe('immediate child selector', () => {
    it('should be supported', () => {
      const Button = adonis.div('ldei0g')

      const content = <Button />
      const html = render(content)

      html.should.equal(`<div class="div_ldei0g"></div>`)
    })
  })
})
