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
const buildPrefixedProps = (prefix, data) => Object.keys(data).reduce((props, key) => {
  props[`${prefix}-${key}`] = data[key]
  return props
}, {})

/**
 * Represent a "No-Operation" function that can be used as a sensible
 * default to event handlers in the absence of a value.
 *
 * @returns {() => {}} the noop function.
 */
export const noop = () => {}

/**
 * Maps a given aria object into HTML valid aria attribtues and their values.
 *
 * @param {Object} aria the object containing the aria prop values.
 * @returns {Object} an object holding the HTML valid aria props and their values.
 */
export const buildAriaProps = aria => buildPrefixedProps("aria", aria)

/**
 * Maps a given data object into HTML valid data attribtues and their values.
 *
 * @param {Object} data the object containing the data prop values.
 * @returns {Object} an object holding the HTML valid data props and their values.
 */
export const buildDataProps = data => buildPrefixedProps("data", data)

/**
 * Builds a Playbook valid root className off of the incoming css rules.
 *
 * @param {Object} rules a 'classnames' compliant rules object, used to derive the root className.
 * @returns {String} the derived root className value.
 */
export const buildCss = (rules, delimiter = '_') => classnames(rules).replace(/\s/g, delimiter)
