export const linkFormat = (item) => {
  const linkTitle = Array.isArray(item) ? item[0] : item
  const replaceUnderscore = linkTitle
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' ')
  return replaceUnderscore
}
