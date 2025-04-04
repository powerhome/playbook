import React, { useState } from 'react'

import Caption from '../../pb_caption/_caption'
import Typeahead from '../../pb_typeahead/_typeahead'
import User from '../../pb_user/_user'

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
      imageUrl: result.avatar_url, //add the custom field
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
        .then((results) => resolve(filterResults(results)))
    } else {
      resolve([])
    }
  })

const TypeaheadWithPillsAsyncUsers = (props) => {
  const [users, setUsers] = useState([])
  const handleOnChange = (value) => setUsers(value)

  /**
   *
   * @const handleOnMultiValueClick {function} - a custom callback for the MultiValue click
   * @ignore
   * @returns {null}
   * @summary - for doc example purposes only
   */
  const handleOnMultiValueClick = (value) => {
    alert(`You added the user: "${value.label}"`)
  }

  return (
    <>
      {users && users.length > 0 && (
        <React.Fragment>
          <Caption
              marginBottom="xs"
              text="State (Users)"
              {...props}
          />
          {users.map((user) => (
            <User
                align="left"
                avatar
                avatarUrl={user.imageUrl}
                key={user.value}
                marginBottom="md"
                name={user.label}
                orientation="horizontal"
                {...props}
            />
          ))}
        </React.Fragment>
      )}
      <Typeahead
          async
          isMulti
          label="Github Users"
          loadOptions={promiseOptions}
          noOptionsMessage={() => 'Type to Search'}
          onChange={handleOnChange}
          onMultiValueClick={handleOnMultiValueClick}
          placeholder="type the name of a Github user"
          {...props}
      />
    </>
  )
}

export default TypeaheadWithPillsAsyncUsers
