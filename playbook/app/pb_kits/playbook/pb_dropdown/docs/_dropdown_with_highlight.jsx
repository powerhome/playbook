import React, { useState } from 'react'

import Avatar from '../../pb_avatar/_avatar'
import Body from '../../pb_body/_body'
import Dropdown from '../../pb_dropdown/_dropdown'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import Title from '../../pb_title/_title'

const USERS = [
  {
    label: "Wade Winningham",
    title: "Nitro Principal Developer",
    territory: "PHL",
    value: "wadeWinningham",
  },
  {
    label: "Carlos Lima",
    title: "Nitro Developer",
    territory: "PHL",
    value: "carlosLima",
  },
  {
    label: "Stephen Marshall",
    title: "Senior Nitro Developer",
    territory: "PHL",
    value: "stephenMarshall",
  },
  {
    label: "Jasper Furniss",
    title: "Lead User Experience Engineer",
    territory: "PHL",
    value: "jasperFurniss",
  },
]

const escapeRegExp = (value = "") => (
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
)

const highlighted = (text, searchInput) => {
  if (!searchInput) return text

  const regex = new RegExp(`(${escapeRegExp(searchInput)})`, 'gi')

  return text.split(regex).map((part, index) => (
    part.toLowerCase() === searchInput.toLowerCase()
      ? <mark key={`${part}-${index}`}>{part}</mark>
      : <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
  ))
}

const loadUsers = (searchInput) => {
  const normalizedInput = searchInput.toLowerCase()

  return Promise.resolve(USERS.filter(({ label, title }) => (
    `${label} ${title}`.toLowerCase().includes(normalizedInput)
  )))
}

const DropdownWithHighlight = (props) => {
  const [searchInput, setSearchInput] = useState("")

  const renderUser = ({ label, territory, title }) => (
    <Flex>
      <FlexItem>
        <Avatar
            marginRight="sm"
            name={label}
            size="sm"
        />
      </FlexItem>
      <FlexItem>
        <Title size={4}>
          {highlighted(label, searchInput)}
        </Title>
        <Body color="light">
          {highlighted(title, searchInput)}{" • "}
          {territory}
        </Body>
      </FlexItem>
    </Flex>
  )

  return (
    <Dropdown
        async
        autocomplete
        defaultOptions={USERS}
        label="Users"
        loadOptions={loadUsers}
        onInputChange={(input) => setSearchInput(input)}
        onSelect={() => setSearchInput("")}
        placeholder="Search users"
        renderOption={renderUser}
        {...props}
    />
  )
}

export default DropdownWithHighlight
