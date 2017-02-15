import ThemeProvider from './lib/theme-provider'
import withTheme from './lib/with-theme'
import buildPreRenderCSS from './lib/prerender-css'

export default (options = {}) => {
  let StyleSheet, css, StyleSheetServer, StyleSheetTestUtils

  // @if NO_OBJECT_STYLES=false
  if (!options.noObjectStyles) {
    const OriginalStyleSheet = require('aphrodite/no-important').StyleSheet

    // Extensions
    const ImmediateChildExtension = require('./lib/extensions/immediate-child').default
    let ExtendedStyleSheet = OriginalStyleSheet.extend([ImmediateChildExtension])

    StyleSheet = ExtendedStyleSheet.StyleSheet
    css = ExtendedStyleSheet.css
    StyleSheetServer = ExtendedStyleSheet.StyleSheetServer
    StyleSheetTestUtils = ExtendedStyleSheet.StyleSheetTestUtils
  }
  // @endif

  // @if NO_OBJECT_STYLES=true
  if (options.noObjectStyles) {
    // When object styles are disabled and we're passing object hashes instead, we only need
    // a very dumb version of aphrodite which creates class names
    const dumbAphrodite = require('./lib/dumb-aphrodite')
    css = dumbAphrodite.css
    StyleSheet = dumbAphrodite.StyleSheet
  }
  // @endif

  // @if PRE_INJECTION=true
  // We don't need injection while rendering if we are pre-injecting
  if (options.preInjection) {
    const originalCSS = css
    css = (...styleDefinitions) => {
      StyleSheetTestUtils.suppressStyleInjection()
      const className = originalCSS(...styleDefinitions)
      StyleSheetTestUtils.clearBufferAndResumeStyleInjection()

      return className
    }
  }
  // @endif

  const adonis = require('./adonis')(options, { StyleSheet, StyleSheetTestUtils, css })

  return {
    defaultExport: adonis,
    StyleSheet,
    StyleSheetServer,
    StyleSheetTestUtils,
    css,
    ThemeProvider,
    preRenderCSS: buildPreRenderCSS(adonis, options, StyleSheetServer),
    withTheme
  }
}
