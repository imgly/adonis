import { StyleSheetServer } from '../globals'
import adonis from '../adonis'

export default function (theme, renderFunction) {
  if (typeof renderFunction === 'undefined') {
    renderFunction = theme
    theme = null
  }

  adonis.enablePreRenderInjection(theme)
  const { css } = StyleSheetServer.renderStatic(() => {
    renderFunction()
    adonis.disablePreRenderInjection()
  })
  return css
}
