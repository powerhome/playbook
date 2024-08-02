import { filter } from 'lodash';
const isEmpty = (value) => !value || value == '';
const titleizedWord = (word) => (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
export const titleize = (sentence) => (isEmpty(sentence) ? sentence : sentence.split(' ').map(titleizedWord).join(' '));
const notEmpty = (value) => !isEmpty(value);
export const joinPresent = (array, separator) => (filter(array, notEmpty).join(separator));
export const camelToSnakeCase = (word) => {
    return word.split(/([A-Z])/g).map((w, i) => {
        const prefix = i > 0 ? '_' : '';
        return w === w.toLowerCase() ? w : prefix + w.toLowerCase();
    }).join("");
};
//# sourceMappingURL=text.js.map