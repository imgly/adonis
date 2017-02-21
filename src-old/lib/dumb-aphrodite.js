export function css (...styles) {
  return styles
    .map(s => s._name)
    .join('-o_O-')
}

export class StyleSheet {
  // Input: { button: 'abcdef', primary: 'abcdef' }
  // Output: { button: { _name: 'abcdef' }, primary: { _name: 'abcdef' }}
  static create (styles) {
    const stylesObject = {}
    for (let key in styles) {
      stylesObject[key] = { _name: `${key}_${styles[key]}` }
    }
    return stylesObject
  }
}
