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

export const uniqueId: (prefix?: string) => string = (() => {
  let counter = 0
  return (prefix = '') => `${prefix}${++counter}`
})()

export const omitBy = (obj: Record<string, any>, predicate: (value: any, key: string) => boolean) => {
  if (obj === null || typeof obj !== 'object') return {}
  return Object.keys(obj).reduce((result: Record<string, any>, key: string) => {
    if (!predicate(obj[key], key)) {
      result[key] = obj[key];
    }
    return result;
  }, {})
}

export const noop = (): void => {
  // empty
};

export const merge = (...objects: any[]): any => {
  const isObject = (obj: any): boolean => obj && typeof obj === 'object';
  const result = {} as any;
  objects.forEach(obj => {
    if (isObject(obj)) {
      Object.keys(obj).forEach(key => {
        const existingVal = result[key];
        const newVal = obj[key];
        if (isObject(existingVal) && isObject(newVal)) {
          result[key] = merge(existingVal, newVal);
        } else {
          result[key] = newVal;
        }
      });
    }
  });
  return result;
}
