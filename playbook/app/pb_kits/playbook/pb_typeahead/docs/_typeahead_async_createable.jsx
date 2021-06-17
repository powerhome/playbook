// @flow

import React from 'react'
import { Typeahead } from '../..'

/**
 *
 * @const filterResults
 * @ignore
 * @returns {[Object]} - a custom mapping of objects, minimally containing
 * `value` and `label` among other possible fields
 * @summary - for doc example purposes only
 */

const filterResults = (results) =>
  results.items.map((result) => {
    return {
      label: result.login,
      value: result.id,
    }
  })

/**
*
* @const promiseOptions
* @ignore
* @returns {Promise} - fetch API data results from Typeahead input text
* @see - https://react-select.com/home#async
* @summary - for doc example purposes only
*/

const promiseOptions = (inputValue) =>
  new Promise((resolve) => {
    if (inputValue) {
      fetch(`https://api.github.com/search/users?q=${inputValue}`)
        .then((response) => response.json())
        .then((results) => {
          resolve(results.items ? filterResults(results) : [])
        })
    } else {
      resolve([])
    }
  })

const TypeaheadAsyncCreateable = (props) => {
  return (
    <Typeahead
        async
        createable
        isMulti
        label="Existing or User Created Options"
        loadOptions={promiseOptions}
        {...props}
    />
  )
}

export default TypeaheadAsyncCreateable
