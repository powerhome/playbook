type HighlightChunk = {
  start: number,
  end: number,
  highlight: boolean,
}

const escapeRegExp = (value: string): string =>
  value.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')

/**
 * Finds all case-insensitive, literal (auto-escaped) matches for the given
 * search terms, merges overlapping/adjacent ranges, and returns a full set of
 * highlight and non-highlight chunks covering the text.
 *
 * Mirrors highlight-words-core behavior used by react-highlight-words with
 * autoEscape enabled and caseSensitive disabled.
 */
export const findHighlightChunks = (
  textToHighlight: string,
  searchWords: string[],
): HighlightChunk[] => {
  const text = textToHighlight || ''

  const matchRanges = searchWords
    .filter((searchWord) => searchWord)
    .reduce<{ start: number, end: number }[]>((chunks, searchWord) => {
      const regex = new RegExp(escapeRegExp(searchWord), 'gi')
      let match: RegExpExecArray | null

      while ((match = regex.exec(text))) {
        const start = match.index
        const end = regex.lastIndex

        if (end > start) {
          chunks.push({ start, end })
        }

        // Prevent zero-length match infinite loops (e.g. Firefox)
        if (match.index === regex.lastIndex) {
          regex.lastIndex++
        }
      }

      return chunks
    }, [])

  const combined = matchRanges
    .sort((first, second) => first.start - second.start)
    .reduce<{ start: number, end: number }[]>((processedChunks, nextChunk) => {
      if (processedChunks.length === 0) {
        return [nextChunk]
      }

      const prevChunk = processedChunks.pop() as { start: number, end: number }

      // Merge overlapping or adjacent ranges (start <= prev end)
      if (nextChunk.start <= prevChunk.end) {
        processedChunks.push({
          start: prevChunk.start,
          end: Math.max(prevChunk.end, nextChunk.end),
        })
      } else {
        processedChunks.push(prevChunk, nextChunk)
      }

      return processedChunks
    }, [])

  const allChunks: HighlightChunk[] = []
  const append = (start: number, end: number, highlight: boolean) => {
    if (end - start > 0) {
      allChunks.push({ start, end, highlight })
    }
  }

  if (combined.length === 0) {
    append(0, text.length, false)
  } else {
    let lastIndex = 0
    combined.forEach((chunk) => {
      append(lastIndex, chunk.start, false)
      append(chunk.start, chunk.end, true)
      lastIndex = chunk.end
    })
    append(lastIndex, text.length, false)
  }

  return allChunks
}
