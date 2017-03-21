/**
 * Creates a sub ruleset every time an pseudo class (e.g. ':last-child') is found
 */
export default (selector, baseSelector, generateSubRuleset, minified) => {
  selector = selector.trim()
  if (selector[0] !== ':') {
    return null
  }

  const newSelector = baseSelector + selector
  return generateSubRuleset(newSelector)
}
