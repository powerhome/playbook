import { filter, isEmpty } from 'lodash'

const titleizedWord = (string) => (
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
)

export const titleize = (sentence) => (
  isEmpty(sentence) ? sentence : sentence.split(' ').map(titleizedWord).join(' ')
)

const notEmpty = (value) => !isEmpty(value)

export const joinPresent = (array, separator) => (
  filter(array, notEmpty).join(separator)
)
