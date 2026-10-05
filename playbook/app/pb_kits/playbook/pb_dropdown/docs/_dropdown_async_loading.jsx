import React from 'react'
import Dropdown from '../_dropdown'

const loadUsers = (term) => fetch(`https://dummyjson.com/users/search?${new URLSearchParams({ q: term, limit: '10', select: 'firstName,lastName' })}`, { credentials: 'omit' })
  .then((response) => {
    if (!response.ok) throw new Error('Search failed')
    return response.json()
  })
  .then(({ users }) => users.map((user) => ({
    ...user,
    label: `${user.firstName} ${user.lastName}`,
    value: user.id,
  })))

const DropdownAsyncLoading = () => (
  <Dropdown
      async
      autocomplete
      label="User"
      loadOptions={loadUsers}
      noOptionsText="No users found"
      placeholder="Try Emily or Michael"
  />
)

export default DropdownAsyncLoading
