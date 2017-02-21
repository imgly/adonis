export default (adonis, options, StyleSheetServer) => {
  return (theme, renderFunction) => {
    if (!StyleSheetServer && options.noObjectStyles) {
      throw new Error("adonis can't pre-render CSS if `noObjectStyles` is set to `true`.")
    }

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
}
