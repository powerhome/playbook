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

export const isString = (str: unknown): str is string =>
  str != null && typeof (str as any).valueOf() === "string"

export const omitBy = (obj: Record<string, any>, predicate: (value: any, key: string) => boolean) => {
  if (obj === null || typeof obj !== 'object') return {}
  return Object.keys(obj).reduce((result: Record<string, any>, key: string) => {
    if (!predicate(obj[key], key)) {
      result[key] = obj[key];
    }
    return result;
  }, {})
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
