import React from 'react'
import Flex from '../../pb_flex/_flex'
import Title from '../../pb_title/_title'
import MultipleUsersStacked from '../_multiple_users_stacked'

const MultipleUsersStackedSize = (props) => {
  const sizes = [
    { label: 'S', size: 'sm' },
    { label: 'M', size: 'md' },
    { label: 'L', size: 'lg' },
    { label: 'XL', size: 'xl' },
  ]

  const usersList = [
    [
      {
        name: 'Patrick Welch',
        imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
      },
    ],
    [
      {
        name: 'Patrick Welch',
        imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
      },
      {
        name: 'Lucille Sanchez',
        imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
      },
    ],
    [
      {
        name: 'Patrick Welch',
        imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
      },
      {
        name: 'Lucille Sanchez',
        imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
      },
      {
        name: 'Beverly Reyes',
        imageUrl: 'https://randomuser.me/api/portraits/women/74.jpg',
      },
    ],
    [
      {
        name: 'Patrick Welch',
        imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
      },
      {
        name: 'Lucille Sanchez',
        imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
      },
      {
        name: 'Beverly Reyes',
        imageUrl: 'https://randomuser.me/api/portraits/women/74.jpg',
      },
      {
        name: 'Keith Craig',
        imageUrl: 'https://randomuser.me/api/portraits/men/40.jpg',
      },
      {
        name: 'Alicia Cooper',
        imageUrl: 'https://randomuser.me/api/portraits/women/46.jpg',
      },
    ],
  ]

  return (
    <>
      {sizes.map(({ label, size }) => (
        <Flex key={size}
            orientation="column"
        >
          <Title paddingTop='sm' >{label}</Title>
          <Flex>
            {usersList.map((users, index) => (
              <Flex key={index}
                  paddingRight='sm'
              >
                <MultipleUsersStacked
                    size={size}
                    users={users}
                    variant="bubble"
                    {...props}
                />
              </Flex>
            ))}
          </Flex>
          <br />
        </Flex>
      ))}
    </>
  )
}

export default MultipleUsersStackedSize
