import React from 'react'
import MultipleUsers from '../../pb_multiple_users/_multiple_users'

const MultipleUsersDefault = (props) => {
  return (
    <div>
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
      <br />

      <MultipleUsers
          users={[
        {
          name: 'Shawn Palmer',
          imageUrl: 'https://randomuser.me/api/portraits/men/93.jpg',
        },
        {
          name: 'Andrew Murray Cooper Craig',
        },
      ]}
          {...props}
      />
    </div>
  )
}

export default MultipleUsersDefault
