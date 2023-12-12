/**
 * Defines a set of helper functions used to construct a component following
 * Playbook's patterns.
 */
import classnames from 'classnames'

/**
 *
 * @param {String} prefix the prefix to be used on the dash separated prop (data, aria, etc...)
 * @param {Object} data the object containing the data to derive the props from.
 * @returns {Object} an object whose keys have the prefix added to them.
 */
const buildPrefixedProps = (prefix: string, data: {[key: string]: any}) => 
  Object.keys(data).reduce((props: {[key: string]: any}, key: string) => {
    props[`${prefix}-${key}`] = data[key]
    return props
  }, {})

/**
 * Represent a "No-Operation" function that can be used as a sensible
 * default to event handlers in the absence of a value.
 *
 * @returns {() => {}} the noop function.
 */
export const noop = (): void => { void 0 }

/**
 * Maps a given aria object into HTML valid aria attribtues and their values.
 *
 * @param {Object} aria the object containing the aria prop values.
 * @returns {Object} an object holding the HTML valid aria props and their values.
 */
export const buildAriaProps = (aria: {[key: string]: string}): {[key: string]: string} => 
  buildPrefixedProps('aria', aria)

/**
 * Maps a given data object into HTML valid data attribtues and their values.
 *
 * @param {Object} data the object containing the data prop values.
 * @returns {Object} an object holding the HTML valid data props and their values.
 */
export const buildDataProps = (data: {[key: string]: any}) => buildPrefixedProps('data', data)

/**
 * Builds a Playbook valid root className off of the incoming css rules.
 *
 * @param {Object} rules a 'classnames' compliant rules object, used to derive the root className.
 * @returns {String} the derived root className value.
 */
export const buildCss = (...rules: (string | { [x: string]: string | boolean; })[]): string => classnames(rules).replace(/\s/g, '_')

/**
 * Maps a given data object into HTML valid attributes and their values.
 * This is a more general version of what buildAriaProps and buildDataProps do.
 * It is used to map any arbitrary prop into a valid HTML attribute.
 *  
 * @returns {Object} an object holding the HTML valid props and their values.
 */

export const buildHtmlProps = (htmlOptions: { [key: string]: string | number | boolean | (() => void)}) => {
  const htmlProps: { [attr: string]: string | number | boolean | (() => void) } = {}
  Object.keys(htmlOptions).forEach((key) => {
    htmlProps[key] = htmlOptions[key]
  })
  return htmlProps
}

