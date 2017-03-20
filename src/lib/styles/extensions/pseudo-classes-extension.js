export default (selector, baseSelector, generateSubRuleset, minified) => {
  selector = selector.trim()
  if (selector[0] !== ':') {
    return null
  }

  const newSelector = baseSelector + selector
  return generateSubRuleset(newSelector)
}
