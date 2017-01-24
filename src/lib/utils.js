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
  },

  /**
   * Assigns own enumerable properties of source object(s) to the destination
   * object for all destination properties that resolve to undefined. Once a
   * property is set, additional values of the same property are ignored.
   * @param  {Object} object
   * @param  {Object} ...sources
   * @return {Object}
   */
  defaults (object, ...sources) {
    // Shallow clone
    let newObject = {}
    for (let key in object) {
      newObject[key] = object[key]
    }

    // Clone sources
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i]
      for (let key in source) {
        if (typeof newObject[key] === 'undefined') {
          newObject[key] = source[key]
        }
      }
    }

    return newObject
  },

  /**
   * Assigns own enumerable properties of source object(s) to the destination
   * object for all destination properties and their properties that resolve to
   * undefined. Once a property is set, additional value sof the same property
   * are ignored.
   * @param  {Object} object
   * @param  {Object} ...sources
   * @return {Object}
   */
  deepDefaults (object, ...sources) {
    // Shallow clone
    let newObject = {}
    for (let key in object) {
      newObject[key] = object[key]
    }

    // Clone sources
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i]
      for (let key in source) {
        if (Utils.isExtendable(newObject[key]) &&
            Utils.isExtendable(source[key])) {
          newObject[key] = Utils.deepDefaults(newObject[key], source[key])
        } else if (typeof newObject[key] === 'undefined') {
          newObject[key] = source[key]
        }
      }
    }

    return newObject
  },

  /**
   * Assigns own enumerable properties of source object(s) to the destination
   * object. Subsequent sources overwrite property assignments of previous
   * sources.
   * @param {Object} object
   * @param {Object} ...sources
   * @return {Object}
   */
  extend (object, ...sources) {
    // Shallow clone
    let newObject = {}
    for (let key in object) {
      newObject[key] = object[key]
    }

    // Extend sources
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i]
      for (let key in source) {
        newObject[key] = source[key]
      }
    }

    return newObject
  },

  /**
   * Checks if this value is extendable / can have keys
   * @param  {*}  val
   * @return {Boolean}
   */
  isExtendable (val) {
    return typeof val !== 'undefined' && val !== null &&
      (typeof val === 'object' || typeof val === 'function')
  }
}

export default Utils
