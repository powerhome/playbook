import React from 'react'
import Dropdown from '../_dropdown'
import Body from '../../pb_body/_body'
import Detail from '../../pb_detail/_detail'

const loadUsers = (term) => fetch(`https://dummyjson.com/users/search?${new URLSearchParams({ q: term, limit: '10', select: 'firstName,lastName,company' })}`, { credentials: 'omit' })
  .then((response) => {
    if (!response.ok) throw new Error('Search failed')
    return response.json()
  })
  .then(({ users }) => users.map((user) => ({
    ...user,
    label: `${user.firstName} ${user.lastName}`,
    value: user.id,
  })))

const renderUser = (user) => (
  <div>
    <Body text={user.label} />
    <Detail text={[user.company?.title, user.company?.department].filter(Boolean).join(' · ')} />
  </div>
)

const DropdownAsyncRichResults = () => (
  <Dropdown
      async
      autocomplete
      label="User"
      loadOptions={loadUsers}
      placeholder="Try Emily or Michael"
      renderOption={renderUser}
  />
)

export default DropdownAsyncRichResults
