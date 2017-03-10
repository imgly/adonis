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
