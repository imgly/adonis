import Adonis from '../../src'
import jsdom from 'mocha-jsdom'

let adonis, styleNode
describe('adonis.global(\'...\')', () => {
  jsdom()
  beforeEach(() => {
    styleNode = document.createElement('style')
    styleNode.setAttribute('data-adonis', true)
    document.head.appendChild(styleNode)
  })

  describe('with `injection` set to `true`', () => {
    beforeEach(() => {
      adonis = new Adonis({
        injection: true,
        batchInjection: false,
        styleNode
      })
    })

    it('should inject the global rules on definition', () => {
      adonis.global('body, html {\n  background: red;\n}')

      styleNode.innerHTML.should.equal('body, html {\n  background: red;\n}')
    })
  })

  describe('with `injection` set to `false`', () => {
    beforeEach(() => {
      adonis = new Adonis({
        injection: false,
        batchInjection: false,
        styleNode
      })
    })

    it('should not inject the rule', () => {
      adonis.global('body, html {\n  background: red;\n}')

      styleNode.innerHTML.should.equal('')
    })
  })
})

describe('adonis.global(theme => \'...\')', () => {
  jsdom()
  beforeEach(() => {
    styleNode = document.createElement('style')
    styleNode.setAttribute('data-adonis', true)
    document.head.appendChild(styleNode)

    adonis = new Adonis({
      injection: true,
      theme: {
        redColor: 'red'
      },
      batchInjection: false,
      styleNode
    })
  })

  it('should inject the global rules on definition', () => {
    adonis.global(theme => `body, html {\n  background: ${theme.redColor};\n}`)

    styleNode.innerHTML.should.equal('body, html {\n  background: red;\n}')
  })
})
