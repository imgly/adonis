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
    const SelfExtensions = require('./lib/extensions/self').default
    let ExtendedStyleSheet = OriginalStyleSheet.extend([
      ImmediateChildExtension,
      SelfExtensions
    ])

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
