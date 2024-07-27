import { filter } from 'lodash'

const isEmpty = (value: string | unknown): boolean => value === ''

const titleizedWord = (word: string): string => (
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
)

export const titleize = (sentence: string): string => (
  isEmpty(sentence) ? sentence : sentence.split(' ').map(titleizedWord).join(' ')
)

const notEmpty = (value: string | Record<string, unknown>): boolean => !isEmpty(value)

export const joinPresent = (array: string[], separator: string): string => (
  filter(array, notEmpty).join(separator)
)

export const camelToSnakeCase = (word: string): string => {
  return word.split(/([A-Z])/g).map((w, i) => {
    const prefix = i > 0 ? '_' : ''
    return w === w.toLowerCase() ? w : prefix + w.toLowerCase()
  }).join("")
}
