// Regex to match emoji/pictographic characters
// With modifiers: Zero Width Joiner, Variation Selectors, Skin Tone Modifiers
export const EMOJI_REGEX = /\p{Extended_Pictographic}|\u200D|\uFE0F|[\u{1F3FB}-\u{1F3FF}]/gu

// Utility function to strip emojis from text when typing emojis
export const stripEmojisForTyping = (text: string): string => {
  return text.replace(EMOJI_REGEX, '')
}

// Utility function to strip emojis and clean up whitespace when pasting emojis
export const stripEmojisForPaste = (text: string): string => {
  return stripEmojisForTyping(text)
    .replace(/\s+/g, ' ')
    .trim()
}

type EmojiMaskResult = {
  value: string
  cursor: number | null
}

// Union type for elements that support emoji masking
type TextInputElement = HTMLInputElement | HTMLTextAreaElement

export const applyEmojiMask = (
  element: TextInputElement
): EmojiMaskResult => {
  const cursor = element.selectionStart
  const original = element.value
  const filtered = stripEmojisForTyping(original)
  
  if (original !== filtered) {
    const beforeCursor = original.slice(0, cursor || 0)
    const newCursor = stripEmojisForTyping(beforeCursor).length
    element.value = filtered
    element.selectionStart = element.selectionEnd = newCursor
    return { value: filtered, cursor: newCursor }
  }
  return { value: original, cursor }
}


