export const linkFormat = (item: string) => {
  const linkTitle = Array.isArray(item) ? item[0] : item;
  
  const formattedTitle = linkTitle
    .replace(/_/g, ' ') // replaces underscore
    .replace(/\b(?:and)\b/g, '&') // replaces "and" with "&"
    .replace(/\b\w/g, (match: string) => match.toUpperCase());

  return formattedTitle;
};