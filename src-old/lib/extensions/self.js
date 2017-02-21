export default {
  selectorHandler: (selector, baseSelector, generateSubtreeStyles) => {
    if (selector[0] !== '&') {
      return null
    }

    selector = selector.slice(1).trim()
    const selectors = selector.split(/[ ,]+/)
      .map((selector) => `${baseSelector} ${selector}`)
    return generateSubtreeStyles(`${selectors.join(',')}`)
  }
}
