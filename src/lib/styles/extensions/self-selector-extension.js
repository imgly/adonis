/**
 * Creates a sub ruleset every time a self selector (e.g. '& h1, h2, h3') is found
 */
export default (selector, baseSelector, generateSubRuleset, minified) => {
  selector = selector.trim()
  if (selector[0] !== '&') {
    return null
  }

  let extendingSelector = !selector.match(/^&\s+/) // `&.foo` (extending) vs. `& .foo` (non extending)
  selector = selector.replace(/^&/, '') // `& h1, h2, h3` => ` h1, h2, h3`

  const newSelector = selector
    .split(',').map(s => s.trim()) // h1, h2, h3 => [h1, h2, h3]
    .map((s, i) => `${baseSelector}${(i === 0 && extendingSelector) ? '' : ' '}${s}`) // [h1, h2, h3] => [.base h1, .base h2, .base h3]
    .join(', ') // [.base h1, .base h2, .base h3] => `.base h1, .base h2, .base h3`
  return generateSubRuleset(newSelector)
}
