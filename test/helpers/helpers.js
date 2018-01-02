import { shallow } from 'enzyme'
export const render = (adonis, content) => {
  return adonis.preRenderCSS(() => {
    return shallow(content).html()
  })
}
