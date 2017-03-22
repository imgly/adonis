/**
 * Creates a sub ruleset every time a media query is found
 */
export default (selector, baseSelector, generateSubRuleset, minified) => {
  selector = selector.trim()
  if (selector[0] !== '@') {
    return null
  }

  return generateSubRuleset(baseSelector, selector)
}
