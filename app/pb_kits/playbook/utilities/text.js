import { isEmpty } from 'lodash'

const titleizedWord = (string) => (
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
)

export const titleize = (sentence) => {
  isEmpty(sentence) ? sentence : sentence.split(' ').map(titleizedWord).join(' ')
}
