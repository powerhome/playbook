type SearchKey<T> = keyof T | ((item: T) => string[])

const normalize = (value: string): string => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[æœøłđß]/gi, (letter) => {
    const replacements: Record<string, string> = { æ: 'ae', œ: 'oe', ø: 'o', ł: 'l', đ: 'd', ß: 'ss' }
    const replacement = replacements[letter.toLowerCase()]
    return letter === letter.toUpperCase() ? replacement.toUpperCase() : replacement
  })

const rankMatch = (value: string, query: string): number => {
  const text = normalize(value)
  if (text === query) return 7

  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  if (lowerText === lowerQuery) return 6
  if (lowerText.startsWith(lowerQuery)) return 5
  if (lowerText.includes(` ${lowerQuery}`)) return 4
  if (lowerText.includes(lowerQuery)) return 3
  if (lowerQuery.length < 2) return 0

  const initials = lowerText.split(/[ -]/).map((word) => word.charAt(0)).join('')
  if (initials.includes(lowerQuery)) return 2

  const first = lowerText.indexOf(lowerQuery[0])
  if (first === -1) return 0
  let last = first
  for (let index = 1; index < lowerQuery.length; index++) {
    last = lowerText.indexOf(lowerQuery[index], last + 1)
    if (last === -1) return 0
  }
  return 1 + 1 / (last - first)
}

// Only the search features used by the website: ranked fields, array fields,
// accent-insensitive matching, acronyms and optional fuzzy matching.
export function searchItems<T>(
  items: T[],
  query: string,
  keys: SearchKey<T>[],
  containsOnly = false,
): T[] {
  const normalizedQuery = normalize(query)
  const threshold = containsOnly ? 3 : 1

  return items.map((item, index) => {
    const values = keys.reduce<string[]>((result, key) => {
      const value = typeof key === 'function' ? key(item) : item[key]
      return result.concat(Array.isArray(value) ? value : value == null ? [] : [String(value)])
    }, [])
    let rank = 0
    let keyIndex = -1
    let rankedValue = ''
    values.forEach((value, valueIndex) => {
      const candidateRank = rankMatch(value, normalizedQuery)
      if (candidateRank > rank) {
        rank = candidateRank
        keyIndex = valueIndex
        rankedValue = value
      }
    })
    return { index, item, keyIndex, rank, rankedValue }
  })
    .filter(({ rank }) => rank >= threshold)
    .sort((left, right) => right.rank - left.rank ||
      left.keyIndex - right.keyIndex ||
      left.rankedValue.localeCompare(right.rankedValue) ||
      left.index - right.index)
    .map(({ item }) => item)
}
