export const randoInt = (multiplier = 100000) => parseInt(Math.random() * multiplier)
export const randoFloat = (multiplier = 100000, decimals = 2) => parseFloat(Math.random() * multiplier).toFixed(decimals)
