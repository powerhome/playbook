/* 🛠️ Any commonly used lodash functions can be added here. 🤙 */

export const isEmpty = (obj: any) => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

export const get = <T, R = any>(obj: T, path: string, defaultValue?: R): R | any => {
  const travel = (regexp: RegExp): any =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res: any, key: string) => (res !== null && res !== undefined ? res[key] : res), obj)
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
  return result === undefined || result === obj ? defaultValue : result
}

export const map = <T, U>(
  collection: T[] | Record<string, T> | null | undefined,
  iteratee: (value: any, key: string, collection: T[] | Record<string, T>) => U
): U[] => {
  if (!collection) return []
  const coerce = (val: any) => {
    if (val === true) return val
    if (
      typeof val === "number" ||
      typeof val === "string" ||
      typeof val === "boolean" ||
      val === null
    )
      return String(val)
    return val
  }
  return Array.isArray(collection)
    ? collection.map((v, i) => iteratee(coerce(v), String(i), collection))
    : Object.keys(collection).map(key => iteratee(coerce(collection[key]), key, collection))
}

export const isString = (str: unknown): str is string =>
  str != null && typeof (str as any).valueOf() === "string"

export const omitBy = <T extends Record<string, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: string) => boolean
): Partial<T> => {
  if (obj === null || typeof obj !== 'object') return {} as Partial<T>
  return Object.keys(obj).reduce((result, key) => {
    const typedKey = key as keyof T
    if (!predicate(obj[typedKey], key)) {
      result[typedKey] = obj[typedKey]
    }
    return result
  }, {} as Partial<T>)
}

export const uniqueId: (prefix?: string) => string = (() => {
  let counter = 0
  return (prefix = '') => `${prefix}${++counter}`
})()

type PlainObject = { [key: string]: any }

const isObject = (item: any): item is PlainObject =>
  item !== null && typeof item === 'object'

export const merge = <T extends PlainObject>(
  target: T,
  ...sources: PlainObject[]
): T => {
  if (!sources.length) return target
  const source = sources.shift()!
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key: string) => {
      const typedKey = key as keyof T
      const srcValue = source[key]
      if (isObject(srcValue)) {
        if (!target[typedKey]) {
          target[typedKey] = (Array.isArray(srcValue) ? [] : {}) as unknown as T[typeof typedKey]
        }
        merge(target[typedKey], srcValue)
      } else {
        target[typedKey] = srcValue
      }
    })
  }
  return merge(target, ...sources)
}
