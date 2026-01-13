export const linkFormat = (item: string) => {
  const linkTitle = Array.isArray(item) ? item[0] : item;
  
  const highchartsKits = ['pb_bar_graph', 'pb_circle_chart', 'pb_line_graph', 'pb_gauge_chart'];
  
  if (highchartsKits.includes(linkTitle)) {
    return 'PB ' + linkTitle
      .replace(/^pb_/, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (match: string) => match.toUpperCase());
  }
  
  const formattedTitle = linkTitle
    .replace(/_/g, ' ') // replaces underscore
    .replace(/\b(?:and)\b/g, '&') // replaces "and" with "&"
    .replace(/\b\w/g, (match: string) => match.toUpperCase());

  return formattedTitle;
};