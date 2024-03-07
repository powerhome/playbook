export const isValidEmoji = (emoji: string) => {
    // Using regular expression to check if the string is a valid emoji/emoji Unicode
    const emojiRegex = /^(\p{Emoji}|\uFE0F|\u200D|\u20E3)+$/u;
    return emojiRegex.test(emoji);
  };
  