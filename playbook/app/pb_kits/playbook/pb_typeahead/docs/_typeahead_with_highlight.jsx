/* eslint-disable react/no-danger */
/* eslint-disable react/no-multi-comp */

import React, { useState } from 'react'
import { components } from 'react-select'

import {
  Avatar,
  Body,
  Flex,
  FlexItem,
  Title,
  Typeahead,
} from 'playbook-ui'

const USERS = [
  {
    name: "Wade Winningham",
    title: "Nitro Principal Developer",
    territory: "PHL",
  },
  {
    name: "Jason Cypret",
    title: "Vice President of User Experience",
    territory: "PHL",
  },
  {
    name: "Stephen Marshall",
    title: "Senior User Experience Engineer",
    territory: "PHL",
  },
  {
    name: "Jasper Furniss",
    title: "Senior User Experience Engineer",
    territory: "PHL",
  },
];

const TypeaheadWithHighlight = (props) => {
  const [selectedUser, setSelectedUser] = useState()

  const formatOptionLabel = ({name, territory, title}, {inputValue}) => {

    const highlighted = (text) => {
      if (!inputValue.length) return text
      return text.replace(
        new RegExp(inputValue, 'gi'),
        (highlighted) => `<mark>${highlighted}</mark>`
      )
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
            <span dangerouslySetInnerHTML={{ __html: highlighted(name) }} /></Title>
          <Body color="light"
              {...props}
          >
            <span dangerouslySetInnerHTML={{ __html: highlighted(title) }} />{" • "}
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
