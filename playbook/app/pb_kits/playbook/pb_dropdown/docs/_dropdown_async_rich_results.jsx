import React, { useState } from 'react'
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

const companyDetail = (user) => [user.company?.title, user.company?.department].filter(Boolean).join(' · ')

const renderUser = (user) => (
  <div>
    <Body text={user.label} />
    <Detail text={companyDetail(user)} />
  </div>
)

const DropdownAsyncRichResults = () => {
  const [selected, setSelected] = useState(null)

  return (
    <Dropdown
        async
        autocomplete
        label="User"
        loadOptions={loadUsers}
        onSelect={setSelected}
        placeholder="Try Emily or Michael"
        renderOption={renderUser}
        value={selected}
    >
      <Dropdown.Trigger customDisplay={selected && <Detail text={companyDetail(selected)} />} />
      <Dropdown.Container />
    </Dropdown>
  )
}

export default DropdownAsyncRichResults
