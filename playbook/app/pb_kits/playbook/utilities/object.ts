/* 🛠️ Any commonly used lodash functions can be added here. 🤙 */

export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
