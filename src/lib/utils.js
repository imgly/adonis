const Utils = {
  /**
   * Generates a random string
   * @param  {Number} length = 10
   * @return {String}
   */
  generateClassName (length = 10) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    let className = ''
    for (let i = 0; i < length; i++) {
      className += chars[Math.floor(Math.random() * chars.length)]
    }
    return className
  },

  /**
   * Generates a name for the given target (tag name, class name or random string)
   * @param  {Object} target
   * @return {String}
   */
  generateStyleNameForTarget (target) {
    if (typeof target === 'string') {
      return target
    } else {
      return target.name ? target.name : Utils.generateClassName()
    }
  },

  /**
   * Checks if the given object has any functions deep inside of it
   * @param  {Object} obj
   * @return {Boolean}
   */
  objectHasFunctions (obj) {
    for (let prop in obj) {
      const value = obj[prop]
      const valueType = typeof value
      if (valueType === 'object') {
        if (Utils.objectHasFunctions(value)) {
          return true
        }
      } else if (valueType === 'function') {
        return true
      }
    }
    return false
  }
}

export default Utils
