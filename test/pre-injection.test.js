import adonis, { StyleSheetServer, preRenderCSS } from '../src/no-injection'
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

describe('pre injection', () => {
  describe('initial styles', () => {
    it('should render correctly', () => {
      let Icon, InactiveIcon

      preRenderCSS(() => {
        Icon = adonis.img({}, 'Icon')
        InactiveIcon = adonis(Icon)({}, 'InactiveIcon')
      })

      const content = <InactiveIcon />
      const { html, css } = render(content)

      html.should.equal('<img class="Icon_120drhm-o_O-InactiveIcon_120drhm"/>')
      css.content.should.equal('')
    })
  })
})
