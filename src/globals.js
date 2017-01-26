import { StyleSheet as OriginalStyleSheet } from 'aphrodite/no-important'

// Extensions
import ImmediateChildExtension from './lib/extensions/immediate-child'
let ExtendedStyleSheet = OriginalStyleSheet.extend([ImmediateChildExtension])

const { StyleSheet, css, StyleSheetServer } = ExtendedStyleSheet
export { StyleSheet, css, StyleSheetServer }
