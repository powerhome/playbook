/* 🛠️ Any commonly used lodash functions can be added here. 🤙 */

export const isEmpty = (obj: any) =>
  [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length

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

export const uniqueId: (prefix?: string) => string = (() => {
  let counter = 0
  return (prefix = '') => `${prefix}${++counter}`
})()

export const omitBy = (obj: Record<string, any>, predicate: (value: any, key: string) => boolean) => {
  if (obj === null || typeof obj !== 'object') return {}
  return Object.keys(obj).reduce((result: Record<string, any>, key: string) => {
    if (!predicate(obj[key], key)) {
      result[key] = obj[key]
    }
    return result
  }, {})
}

export const omit = (
  obj: Record<string, any>,
  ...paths: (string | string[])[]
): Record<string, any> => {
  if (obj === null || typeof obj !== 'object') return {}
  const keysToOmit = new Set<string>()
  paths.forEach(p => {
    if (Array.isArray(p)) {
      p.forEach(key => keysToOmit.add(key))
    } else {
      keysToOmit.add(p)
    }
  })
  const result: Record<string, any> = {}
  for (const key in obj) {
    if (!keysToOmit.has(key)) {
      result[key] = obj[key]
    }
  }
  return result
}

export const noop = (): void => {
  // empty
}

export const cloneDeep = (value: any): any => {
  if (value === null || typeof value !== 'object') {
    return value
  }
  if (Array.isArray(value)) {
    return value.map(cloneDeep)
  }
  if (value instanceof Date) {
    return new Date(value.getTime())
  }
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags)
  }
  const clonedObj: any = {}
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      clonedObj[key] = cloneDeep(value[key])
    }
  }
  return clonedObj
}

export function merge(
  ...objects: Array<Record<string, unknown> | null | undefined>
): Record<string, unknown> {
  const isPlainObject = (obj: unknown): obj is Record<string, unknown> =>
    !!obj && typeof obj === 'object' && !Array.isArray(obj)

  const result: Record<string, unknown> = {}

  for (const obj of objects) {
    if (!obj || typeof obj !== 'object') continue

    for (const key of Object.keys(obj)) {
      const oldVal = result[key]
      const newVal = (obj as Record<string, unknown>)[key]

      if (Array.isArray(oldVal) && Array.isArray(newVal)) {
        result[key] = newVal
      } else if (isPlainObject(oldVal) && isPlainObject(newVal)) {
        result[key] = merge(oldVal, newVal)
      } else if (Array.isArray(oldVal) && isPlainObject(newVal)) {
        result[key] = oldVal
      } else if (isPlainObject(oldVal) && Array.isArray(newVal)) {
        result[key] = oldVal
      } else {
        result[key] = newVal
      }
    }
  }
  return result
}

const createIteratee = (predicate: any) => {
  if (typeof predicate === 'function') {
    return predicate
  }
  if (typeof predicate === 'string') {
    return (obj: any) => obj[predicate]
  }
  if (Array.isArray(predicate)) {
    const [key, value] = predicate
    return (obj: any) => obj[key] === value
  }
  if (typeof predicate === 'object' && predicate !== null) {
    return (obj: any) => {
      for (const key in predicate) {
        if (Object.prototype.hasOwnProperty.call(predicate, key)) {
          if (obj[key] !== predicate[key]) return false
        }
      }
      return true
    }
  }
  return () => false
}

export const filter = <T>(array: T[], predicate: any): T[] => {
  const iteratee = createIteratee(predicate)
  return array.filter(iteratee)
}

export const find = <T>(array: T[], predicate: any): T | undefined => {
  const iteratee = createIteratee(predicate)
  return array.find(iteratee)
}

export const partial = <F extends (...args: any[]) => any>(
  fn: F,
  ...partials: any[]
): ((...args: any[]) => ReturnType<F>) => {
  const placeholder = partial.placeholder
  return (...args: any[]): ReturnType<F> => {
    let argIndex = 0
    const finalArgs = partials.map(arg =>
      arg === placeholder ? args[argIndex++] : arg
    )
    return fn(...(finalArgs.concat(args.slice(argIndex)) as Parameters<F>)) as ReturnType<F>
  }
}

partial.placeholder = Symbol()
export const _ = partial.placeholder

export const map = <T, U>(
  collection: T[] | Record<string, T>,
  iteratee?: ((value: T, index: number | string, collection: T[] | Record<string, T>) => U) | string
): U[] => {
  const fn =
    typeof iteratee === "function"
      ? iteratee
      : typeof iteratee === "string"
      ? (item: T) => (item as any)[iteratee]
      : (item: T) => item as unknown as U

  if (Array.isArray(collection)) {
    return collection.map((value, index) => fn(value, index, collection))
  }
  return Object.keys(collection).map(key => fn(collection[key], key, collection))
}

export function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number,
  immediate?: boolean
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function(this: any, ...args: any[]) {
    if (timeout) clearTimeout(timeout);
    if (immediate && !timeout) {
      func.apply(this, args);
    }
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        func.apply(this, args);
      }
    }, wait);
  };
}
