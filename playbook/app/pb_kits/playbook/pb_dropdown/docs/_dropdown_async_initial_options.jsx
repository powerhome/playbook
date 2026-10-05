import React from 'react'
import Dropdown from '../_dropdown'

const loadUsers = (term, _callback, { signal }) => fetch(`https://dummyjson.com/users/search?${new URLSearchParams({ q: term, limit: '10', select: 'firstName,lastName' })}`, { credentials: 'omit', signal })
  .then((response) => {
    if (!response.ok) throw new Error('Search failed')
    return response.json()
  })
  .then(({ users }) => users.map((user) => ({
    ...user,
    label: `${user.firstName} ${user.lastName}`,
    value: user.id,
  })))

const DropdownAsyncInitialOptions = () => (
  <Dropdown
      async
      autocomplete
      cacheOptions
      defaultOptions
      label="User"
      loadOptions={loadUsers}
      placeholder="Try Emily or Michael"
  />
)

export default DropdownAsyncInitialOptions
