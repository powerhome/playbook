import React from 'react'
import Dropdown from '../_dropdown'

let searchTimer
let searchController

const loadUsers = (term) => new Promise((resolve, reject) => {
  clearTimeout(searchTimer)
  searchController?.abort()
  const controller = searchController = new AbortController()
  searchTimer = setTimeout(() => {
    const params = new URLSearchParams({ q: term, limit: '10', select: 'firstName,lastName' })
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

const DropdownAsyncLoading = () => (
  <Dropdown
      activeStyle={{
        backgroundColor: "bg_light",
        fontColor: "text_lt_default",
      }}
      async
      autocomplete
      label="User"
      loadOptions={loadUsers}
      placeholder="Try Emily or Michael"
  />
)

export default DropdownAsyncLoading
