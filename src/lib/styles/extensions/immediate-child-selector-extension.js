export default (selector, baseSelector, generateSubRuleset, minified) => {
  selector = selector.trim()
  if (selector[0] !== '>') {
    return null
  }
  selector = selector.slice(1).trim()
  let newSelector = baseSelector
  if (!minified) newSelector += ' '
  newSelector += '>'
  if (!minified) newSelector += ' '
  newSelector += selector

  return generateSubRuleset(newSelector)
}
