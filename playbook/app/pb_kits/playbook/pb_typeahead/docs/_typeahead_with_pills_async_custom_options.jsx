import React, { useState } from 'react'

import {
  Caption,
  Typeahead,
  User,
} from 'playbook-ui'

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
      territory: 'PHL',
      type: result.type,
    }
  })

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

const TypeaheadWithPillsAsyncCustomOptions = (props) => {
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
    alert(`You removed the user: "${value.label}"`)
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
          onChange={handleOnChange}
          onMultiValueClick={handleOnMultiValueClick}
          placeholder="type the name of a Github user"
          valueComponent={({ imageUrl, label, territory, type }) => (
            <User
                avatar
                avatarUrl={imageUrl}
                name={label}
                territory={territory}
                title={type}
            />
          )}
          {...props}
      />
    </>
  )
}

export default TypeaheadWithPillsAsyncCustomOptions
