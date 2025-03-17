import React from 'react'
import Body from '../../pb_body/_body'
import MultipleUsers from '../../pb_multiple_users/_multiple_users'

const MultipleUsersSize = (props) => {
  return (
    <div>
      <Body
          color="light"
          text="xs"
      />
      <MultipleUsers
          users={[
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
      ]}
          {...props}
      />

      <br />

      <MultipleUsers
          marginTop="xs"
          size="xs"
          users={[
            {
              name: 'Shawn Palmer',
              imageUrl: 'https://randomuser.me/api/portraits/men/93.jpg',
            },
            {
              name: 'Andrew Murray Cooper Craig',
              imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
            },
          ]}
          {...props}
      />

      <Body
          color="light"
          marginTop="xs"
          text="xxs"
      />
      <MultipleUsers
          size="xxs"
          users={[
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
          ]}
          {...props}
      />

      <br />

      <MultipleUsers
          marginTop="xs"
          size="xxs"
          users={[
            {
              name: 'Shawn Palmer',
              imageUrl: 'https://randomuser.me/api/portraits/men/93.jpg',
            },
            {
              name: 'Andrew Murray Cooper Craig',
              imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
            },
          ]}
          {...props}
      />
    </div>
  )
}

export default MultipleUsersSize
