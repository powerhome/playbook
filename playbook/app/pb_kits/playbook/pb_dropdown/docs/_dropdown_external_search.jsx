import React, { useEffect, useState } from 'react'
import Dropdown from '../_dropdown'

const DropdownExternalSearch = () => {
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setOptions([])
    setLoading(false)
    if (query.length < 3) return () => controller.abort()
    setLoading(true)
    const timer = setTimeout(() => {
      const params = new URLSearchParams({ q: query, limit: '10', select: 'firstName,lastName' })
      fetch(`https://dummyjson.com/users/search?${params}`, { signal: controller.signal, credentials: 'omit' })
        .then((response) => {
          if (!response.ok) throw new Error('Search failed')
          return response.json()
        })
        .then(({ users }) => {
          if (!controller.signal.aborted) setOptions(users.map((user) => ({
            ...user,
            label: `${user.firstName} ${user.lastName}`,
            value: user.id,
          })))
        })
        .catch(() => { if (!controller.signal.aborted) setOptions([]) })
        .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    }, 250)
    return () => { clearTimeout(timer); controller.abort() }
  }, [query])

  return (
    <form>
      <Dropdown
          activeStyle={{
            backgroundColor: "bg_light",
            fontColor: "text_lt_default",
          }}
          async
          autocomplete
          label="User"
          loading={loading}
          onInputChange={(text, { reason }) => setQuery(reason === 'input' ? text : '')}
          onSelect={setSelected}
          options={options}
          placeholder="Try Emily or Michael"
          value={selected}
      />

    </form>
  )
}

export default DropdownExternalSearch
