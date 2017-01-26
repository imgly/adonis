export default {
  selectorHandler: (selector, baseSelector, generateSubtreeStyles) => {
    if (selector[0] !== '>') {
      return null
    }
    return generateSubtreeStyles(`${baseSelector} ${selector} `)
  }
}
