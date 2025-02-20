/* 🛠️ Any commonly used lodash functions can be added here. 🤙 */

export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

export const get = (obj, path, defaultValue = undefined) => {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj)
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
  return result === undefined || result === obj ? defaultValue : result
}

export const map = (collection, iteratee) => {
  if (!collection) return []

  const result = [];
  const isArray = Array.isArray(collection)

  if (isArray) {
    for (let i = 0; i < collection.length; i++) {
      result.push(iteratee(collection[i], i, collection))
    }
  } else {
    for (const key in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, key)) {
        result.push(iteratee(collection[key], key, collection))
      }
    }
  }

  return result
}

export const isString = str => str != null && typeof str.valueOf() === "string";

export const omitBy = (obj, predicate) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => !predicate(value, key))
  )
