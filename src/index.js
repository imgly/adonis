import buildExports from './exports'

const {
  defaultExport, css, StyleSheet, StyleSheetTestUtils, StyleSheetServer, preRenderCSS, withTheme, ThemeProvider, hashObject
} = buildExports({
  noInjection: process.env.NO_INJECTION,
  noObjectStyles: process.env.NO_OBJECT_STYLES,
  preInjection: process.env.PRE_INJECTION
})

export default defaultExport
export { defaultExport, css, StyleSheet, StyleSheetTestUtils, StyleSheetServer, preRenderCSS, withTheme, ThemeProvider, hashObject }
