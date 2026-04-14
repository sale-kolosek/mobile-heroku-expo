/* eslint-disable import/prefer-default-export */
export const filterObjectAgainstKeys = (object, keys) => {
  return Object.keys(object)
    .filter((key) => keys.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key]
      return obj
    }, {})
}
