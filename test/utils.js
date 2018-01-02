import { shallow, mount as enzymeMount } from 'enzyme'

export const render = (adonis, content) =>
  adonis.renderToStatic(() =>
    shallow(content).html()
  )

export const mount = (adonis, content) =>
  adonis.renderToStatic(() =>
    enzymeMount(content).html()
  )
