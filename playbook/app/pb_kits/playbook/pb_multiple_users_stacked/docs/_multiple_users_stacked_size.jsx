import React from 'react'
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
    <div>
      {sizes.map(({ label, size }) => (
        <div key={size}>
          <h4 style={{ paddingTop: '16px' }}>{label}</h4>
          <div style={{ display: 'flex' }}>
            {usersList.map((users, index) => (
              <div key={index}
                  style={{ paddingRight: '16px' }}
              >
                <MultipleUsersStacked
                    size={size}
                    users={users}
                    variant="bubble"
                    {...props}
                />
              </div>
            ))}
          </div>
          <br />
        </div>
      ))}
    </div>
  )
}

export default MultipleUsersStackedSize
