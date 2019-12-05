/* @flow */

export const largeDateString = (value: DateTime) => {
  const month = value.toMonth().toUpperCase()
  const day = value.toDay()

  return `${month} ${day}`
}

export const defaultDateString = (value: DateTime) => {
  const weekday = value.toWeekday().toUpperCase()
  const month = value.toMonth().toUpperCase()
  const day = value.toDay()

  return `${weekday} · ${month} ${day}`
}
