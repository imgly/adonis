export function css (...styles) {
  return styles.join('-o_O-')
}

export class StyleSheet {
  static create (styles) {
    const stylesObject = {}
    for (let key in styles) {
      stylesObject[key] = `${key}_${styles[key]}`
    }
    return stylesObject
  }
}
