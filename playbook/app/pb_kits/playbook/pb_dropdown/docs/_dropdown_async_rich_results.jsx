import React, { useState } from 'react'
import Dropdown from '../_dropdown'
import Body from '../../pb_body/_body'
import Detail from '../../pb_detail/_detail'

let searchTimer
let searchController

const loadUsers = (term) => new Promise((resolve, reject) => {
  clearTimeout(searchTimer)
  searchController?.abort()
  const controller = searchController = new AbortController()
  searchTimer = setTimeout(() => {
    const params = new URLSearchParams({ q: term, limit: '10', select: 'firstName,lastName,company' })
    fetch(`https://dummyjson.com/users/search?${params}`, { signal: controller.signal, credentials: 'omit' })
      .then((response) => {
        if (!response.ok) throw new Error('Search failed')
        return response.json()
      })
      .then(({ users }) => resolve(users.map((user) => ({
        ...user,
        label: `${user.firstName} ${user.lastName}`,
        value: user.id,
      }))))
      .catch((error) => {
        if (error.name !== 'AbortError') reject(error)
      })
  }, 250)
})

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
        activeStyle={{
          backgroundColor: "bg_light",
          fontColor: "text_lt_default",
        }}
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
