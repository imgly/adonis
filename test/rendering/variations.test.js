import Adonis from '../../src'
import React from 'react'
import jsdom from 'mocha-jsdom'
import { render } from '../utils'

const adonis = new Adonis()
describe('with variations', () => {
  jsdom()
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
    const { html, css } = render(adonis, <App />)

    html.should.equal('<div class="div~18550lg--primary~1nxhvta"></div>')
    css.content.should.equal(`.div~18550lg--primary~1nxhvta {\n  border: 1px solid black;\n  padding: 10px 5px;\n  background: blue;\n}`)
  })

  describe('when passing a name', () => {
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

      const { html, css } = render(adonis, <App />)

      html.should.equal('<div class="Button~18550lg--primary~1nxhvta"></div>')
      css.content.should.equal(`.Button~18550lg--primary~1nxhvta {\n  border: 1px solid black;\n  padding: 10px 5px;\n  background: blue;\n}`)
    })
  })
})

describe('with multiple variations passed to component', () => {
  jsdom()
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
    const { html, css } = render(adonis, <App />)

    html.should.equal('<div class="div~18550lg--primary~1nxhvta--red~10ip45p"></div>')
    css.content.should.equal(`.div~18550lg--primary~1nxhvta--red~10ip45p {\n  border: 1px solid black;\n  padding: 10px 5px;\n  background: red;\n}`)
  })
})
