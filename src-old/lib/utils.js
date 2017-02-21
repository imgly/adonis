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
  },

  /**
   * JS Implementation of MurmurHash2
   *
   * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
   * @see http://github.com/garycourt/murmurhash-js
   * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
   * @see http://sites.google.com/site/murmurhash/
   *
   * @param {Object}
   * @return {String} Base 36 encoded hash result
   */
  hashObject (object) {
    var str = JSON.stringify(object)
    let l = str.length;
    let h = l;
    let i = 0;
    let k;

    while (l >= 4) {
        k = ((str.charCodeAt(i) & 0xff)) |
            ((str.charCodeAt(++i) & 0xff) << 8) |
            ((str.charCodeAt(++i) & 0xff) << 16) |
            ((str.charCodeAt(++i) & 0xff) << 24);

        k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
        k ^= k >>> 24;
        k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));

        h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k;

        l -= 4;
        ++i;
    }

    /* eslint-disable no-fallthrough */ // forgive existing code
    switch (l) {
      case 3: h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
      case 2: h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
      case 1: h ^= (str.charCodeAt(i) & 0xff);
          h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
    }
    /* eslint-enable no-fallthrough */

    h ^= h >>> 13;
    h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
    h ^= h >>> 15;

    return (h >>> 0).toString(36);
  }
}

export default Utils
