/* eslint-disable react/no-multi-comp */

import React, { useState } from 'react'
import { components } from 'react-select'

import Avatar from '../../pb_avatar/_avatar'
import Body from '../../pb_body/_body'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import Title from '../../pb_title/_title'
import Typeahead from '../../pb_typeahead/_typeahead'

const USERS = [
  {
    name: "Wade Winningham",
    title: "Nitro Principal Developer",
    territory: "PHL",
  },
  {
    name: "Carlos Lima",
    title: "Nitro Developer",
    territory: "PHL",
  },
  {
    name: "Stephen Marshall",
    title: "Senior Nitro Developer",
    territory: "PHL",
  },
  {
    name: "Jasper Furniss",
    title: "Lead User Experience Engineer",
    territory: "PHL",
  },
];

const TypeaheadWithHighlight = (props) => {
  const [selectedUser, setSelectedUser] = useState()

  const formatOptionLabel = ({name, territory, title}, {inputValue}) => {
    const escapeRegExp = (value = "") => (
      value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    )

    const highlighted = (text = "") => {
      if (!inputValue.length) return text

      const escapedInputValue = escapeRegExp(inputValue)
      const regex = new RegExp(`(${escapedInputValue})`, 'gi')
      const parts = text.split(regex)

      return parts.map((part, index) => {
        if (part.toLowerCase() === inputValue.toLowerCase()) {
          return <mark key={`${part}-${index}`}>{part}</mark>
        }

        return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
      })
    }

    return (
      <Flex>
        <FlexItem>
          <Avatar
              marginRight="sm"
              name={name}
              size="sm"
              {...props}
          />
        </FlexItem>
        <FlexItem>
          <Title
              size={4}
              {...props}
          >
            {highlighted(name)}
          </Title>
          <Body color="light"
              {...props}
          >
            {highlighted(title)}{" • "}
            {territory}
          </Body>
        </FlexItem>
      </Flex>
    )
  }

  const customComponents = {
    Option: (highlightProps) => (
      <components.Option {...highlightProps}/>
    ),
    SingleValue: ({ ...props }) => (
      <components.SingleValue {...props}>
        <span>{props.data.name}</span>
      </components.SingleValue>
    )
  }

  return (
    <React.Fragment>
      <Typeahead
          components={customComponents}
          formatOptionLabel={formatOptionLabel}
          getOptionLabel={(option) => option.name}
          getOptionValue={({name, title}) => `${name} ${title}`}
          label="Users"
          onChange={(user) => setSelectedUser(user)}
          options={USERS.filter((option) => option.name != selectedUser?.name)}
          placeholder="type the name of a user"
          {...props}
      />
    </React.Fragment>
  )
}

export default TypeaheadWithHighlight
