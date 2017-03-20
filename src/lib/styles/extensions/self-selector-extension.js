export default (selector, baseSelector, generateSubRuleset, minified) => {
  selector = selector.trim()
  if (selector[0] !== '&') {
    return null
  }
  selector = selector.replace(/^&/, '') // `& h1, h2, h3` => `h1, h2, h3`

  const newSelector = selector
    .split(',').map(s => s.trim()) // h1, h2, h3 => [h1, h2, h3]
    .map(s => `${baseSelector} ${s}`) // [h1, h2, h3] => [.base h1, .base h2, .base h3]
    .join(', ') // [.base h1, .base h2, .base h3] => `.base h1, .base h2, .base h3`
  return generateSubRuleset(newSelector)
}
