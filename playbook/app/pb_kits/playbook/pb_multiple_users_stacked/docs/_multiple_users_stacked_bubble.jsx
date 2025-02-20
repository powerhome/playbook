import React from 'react'

import MultipleUsersStacked from '../_multiple_users_stacked'

const MultipleUsersStackedBubble = (props) => {
  return (
    <div>
      <MultipleUsersStacked
          users={[
        {
          name: 'Patrick Welch',
          imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
        },
      ]}
          variant="bubble"
          {...props}
      />
      <br />
      <br />
      <MultipleUsersStacked
          users={[
        {
          name: 'Patrick Welch',
          imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
        },
        {
          name: 'Lucille Sanchez',
          imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
        },
      ]}
          variant="bubble"
          {...props}
      />
      <br />
      <br />
      <MultipleUsersStacked
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
      ]}
          variant="bubble"
          {...props}
      />
      <br />
      <br />
      <MultipleUsersStacked
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
          variant="bubble"
          {...props}
      />
    </div>
  )
}

export default MultipleUsersStackedBubble
