import { withTheme } from '../src'
import jsdom from 'mocha-jsdom'
import { mount } from 'enzyme'
import React from 'react'

describe('adonis', () => {
  describe('component wrapped in withTheme()', () => {
    describe('when passing innerRef', () => {
      jsdom()
      it('should be passed to DOM element', () => {
        class ThemableComponent extends React.Component {
          render () {
            return <div />
          }
        }
        const ThemedComponent = withTheme(ThemableComponent)

        class AppComponent extends React.Component {
          render () {
            return <ThemedComponent innerRef={el => { this.testRef = el }} />
          }
        }
        const content = mount(<AppComponent />)

        content.node.testRef.should.be.instanceOf(ThemableComponent)
      })
    })
  })
})
