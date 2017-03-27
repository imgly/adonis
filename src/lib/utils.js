/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object for all destination properties that resolve to undefined. Once a
 * property is set, additional values of the same property are ignored.
 * @param  {Object} object
 * @param  {Object} ...sources
 * @return {Object}
 */
export const defaults = (object, ...sources) => {
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
}

/**
 * JS Implementation of MurmurHash2
 *
 * @author Gary Court <gary.court@gmail.com>
 * @see http://github.com/garycourt/murmurhash-js
 * @author Austin Appleby <aappleby@gmail.com>
 * @see http://sites.google.com/site/murmurhash/
 *
 * @param {Object}
 * @return {String} Base 36 encoded hash result
 */
export const hashObject = (object) => {
  var str = JSON.stringify(object)
  let l = str.length
  let h = l
  let i = 0
  let k

  while (l >= 4) {
    k = ((str.charCodeAt(i) & 0xff)) |
        ((str.charCodeAt(++i) & 0xff) << 8) |
        ((str.charCodeAt(++i) & 0xff) << 16) |
        ((str.charCodeAt(++i) & 0xff) << 24)

    k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16))
    k ^= k >>> 24
    k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16))

    h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k

    l -= 4
    ++i
  }

  /* eslint-disable no-fallthrough */ // forgive existing code
  switch (l) {
    case 3: h ^= (str.charCodeAt(i + 2) & 0xff) << 16
    case 2: h ^= (str.charCodeAt(i + 1) & 0xff) << 8
    case 1: h ^= (str.charCodeAt(i) & 0xff)
      h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16))
  }
  /* eslint-enable no-fallthrough */

  h ^= h >>> 13
  h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16))
  h ^= h >>> 15

  return (h >>> 0).toString(36)
}

/**
 * Returns a flattened version of the given array
 * @param  {Array} arr
 * @return {Array}
 */
export const flatten = arr => arr.reduce(
  (acc, val) => acc.concat(
    Array.isArray(val) ? flatten(val) : val
  ),
  []
)

/**
 * Returns a copy of the given object, removing all properties that point to functions`
 * @param  {Object} obj
 * @return {Object}
 */
export const toStaticStyles = (obj) => {
  const newObject = {}
  for (let key in obj) {
    const value = obj[key]
    if (typeof value === 'object') {
      newObject[key] = toStaticStyles(value)
    } else if (typeof value !== 'function') {
      newObject[key] = value
    }
  }
  return newObject
}

/**
 * Deep merges the given target and source
 * @param  {Object} target
 * @param  {Object} source
 * @return {Object}
 */
export const deepMerge = (target, source) => {
  const destination = {}

  for (let key in target) {
    destination[key] = target[key]
  }

  for (let key in source) {
    if (typeof source[key] === 'object' && target[key]) {
      destination[key] = deepMerge(target[key], source[key])
    } else {
      destination[key] = source[key]
    }
  }
  return destination
}

/**
 * Deep merges the given objects
 * @param  {Object[]} arr
 * @return {Object}
 */
export const deepMergeAll = arr => arr.reduce(
  (prev, next) => {
    return deepMerge(prev, next)
  }
)

/**
 * Walks through the given object, if it finds a function, it calls it with the given `theme`
 * object and places the result at the same key
 * @param  {Object} object
 * @param  {Object} theme
 * @return {Object}
 */
export const resolveStylesObject = (object, theme) => {
  const resolved = {}
  for (let key in object) {
    const value = object[key]
    if (typeof value === 'object') {
      resolved[key] = resolveStylesObject(value, theme)
    } else if (typeof value === 'function') {
      if (!theme) {
        throw new Error(`Trying to resolve a dynamic property without a \`theme\` given.`)
      }
      resolved[key] = value(theme)
    } else {
      resolved[key] = value
    }
  }
  return resolved
}

/**
 * Returns all possible combinations for the given set of objects
 * @param  {*[]} set
 * @return {*[]}
 */
export const findAllCombinations = (set) =>
  (function acc (xs, set) {
    var x = xs[0]

    if (typeof x === 'undefined') {
      return set
    }

    for (var i = 0, l = set.length; i < l; ++i) {
      set.push(set[i].concat(x))
    }
    return acc(xs.slice(1), set)
  })(set, [[]]).slice(1)

/**
 * Polyfill for window.requestAnimationFrame
 * @return {Function}
 */
export const requestAnimationFrame = (() => {
  let lastAF = 0
  const root = typeof global === 'undefined' ? window : global
  let rAF = root.requestAnimationFrame

  const vendors = ['ms', 'moz', 'webkit', 'o']
  for (let x = 0; x < vendors.length && !rAF; ++x) {
    rAF = root[vendors[x] + 'RequestAnimationFrame']
  }

  if (!rAF && typeof root !== 'undefined' && root.setImmediate) {
    rAF = root.setImmediate
  }

  if (!rAF) {
    rAF = (callback) => {
      const currTime = new Date().getTime()
      const timeToCall = Math.max(0, 16 - (currTime - lastAF))
      const id = setTimeout(function () { callback(currTime + timeToCall) }, timeToCall)
      lastAF = currTime + timeToCall
      return id
    }
  }

  return rAF
})()
