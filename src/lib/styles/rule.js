export default class Rule {
  constructor (key, value) {
    this.key = key
    this.value = value
  }

  getCSSKey () {
    return this.key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
  }

  toCSS (minified = false) {
    const key = this.getCSSKey()
    return `${key}:${minified ? '' : ' '}${this.value};`
  }
}
