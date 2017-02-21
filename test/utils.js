import { shallow } from 'enzyme'

export const render = (adonis, content) => {
  return adonis.renderToStatic(() =>
    shallow(content).html()
  )
}
