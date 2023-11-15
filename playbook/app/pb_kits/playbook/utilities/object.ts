/* 🛠️ Any commonly used lodash functions can be added here. 🤙 */

export const isEmpty = (obj: Record<string, unknown>): boolean =>
  Object.keys(obj).length < 1
