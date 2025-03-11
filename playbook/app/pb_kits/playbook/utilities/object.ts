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
};

const createIteratee = (predicate: any) => {
  if (typeof predicate === 'function') {
    return predicate;
  }
  if (typeof predicate === 'string') {
    return (obj: any) => obj[predicate];
  }
  if (Array.isArray(predicate)) {
    const [key, value] = predicate;
    return (obj: any) => obj[key] === value;
  }
  if (typeof predicate === 'object' && predicate !== null) {
    return (obj: any) => {
      for (const key in predicate) {
        if (Object.prototype.hasOwnProperty.call(predicate, key)) {
          if (obj[key] !== predicate[key]) return false;
        }
      }
      return true;
    };
  }
  return () => false;
};

export const filter = <T>(array: T[], predicate: any): T[] => {
  const iteratee = createIteratee(predicate);
  return array.filter(iteratee);
};

export const find = <T>(array: T[], predicate: any): T | undefined => {
  const iteratee = createIteratee(predicate);
  return array.find(iteratee);
};

export const partial = <F extends (...args: unknown[]) => unknown>(
  fn: F,
  ...partials: unknown[]
): ((...args: unknown[]) => ReturnType<F>) => {
  const placeholder = partial.placeholder;
  return (...args: unknown[]): ReturnType<F> => {
    let argIndex = 0;
    const finalArgs = partials.map(arg =>
      arg === placeholder ? args[argIndex++] : arg
    );
    return fn(...(finalArgs.concat(args.slice(argIndex)) as Parameters<F>)) as ReturnType<F>;
  };
};

partial.placeholder = Symbol();
export const _ = partial.placeholder;
