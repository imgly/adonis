import adonis from '../src'
import React from 'react'

describe('adonis', () => {
  it('is strong', () => {
    class Button extends React.Component {
      render () {
        <div className={this.props.className}>Button</div>
      }
    }

    class AppComponent extends React.Component {
      render () {
        return (<Container>
          <PrimaryButton />
        </Container>)
      }
    }

    const Container = adonis.div({
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%'
    })

    const PrimaryButton = adonis(Button)({
      backgroundColor: 'blue'
    })
  })
})
