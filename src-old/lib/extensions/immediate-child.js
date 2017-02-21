export default {
  selectorHandler: (selector, baseSelector, generateSubtreeStyles) => {
    selector = selector.trim()
    if (selector[0] !== '>') {
      return null
    }
    selector = selector.slice(1).trim()
    return generateSubtreeStyles(`${baseSelector}>${selector}`)
  }
}
