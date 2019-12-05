export const titleize = (sentence) => {
  if (!sentence.split) return sentence

  const titleizedWord = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  let result = []
  sentence.split(' ').forEach((w) => {
    result.push(titleizedWord(w))
  })

  return result.join(' ')
}
