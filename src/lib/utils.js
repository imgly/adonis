const Utils = {
  generateClassName (length = 10) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    let className = ''
    for (let i = 0; i < length; i++) {
      className += chars[Math.floor(Math.random() * chars.length)]
    }
    return className
  },

  generateStyleNameForTarget (target) {
    if (typeof target === 'string') {
      return target
    } else {
      return target.name ? target.name : Utils.generateClassName()
    }
  },

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
