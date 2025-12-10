import React from 'react'
import MultipleUsers from '../../pb_multiple_users/_multiple_users'

const MultipleUsersWithTooltip = (props) => {
    return (
        <div>
            <MultipleUsers
                users={[
                    {
                        name: 'Patrick Welch',
                        imageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
                        tooltip: "Patrick Welch - Online"
                    },
                    {
                        name: 'Lucille Sanchez',
                        imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
                        tooltip: "Lucille Sanchez - Offline"
                    },
                    {
                        name: 'Beverly Reyes',
                        imageUrl: 'https://randomuser.me/api/portraits/women/74.jpg',
                        tooltip: "Beverly Reyes - Online"
                    },
                    {
                        name: 'Keith Craig',
                        imageUrl: 'https://randomuser.me/api/portraits/men/40.jpg',
                        tooltip: "Keith Craig - Away"
                    },
                    {
                        name: 'Alicia Cooper',
                        imageUrl: 'https://randomuser.me/api/portraits/women/46.jpg',
                        tooltip: "Alicia Cooper - Busy"
                    },
                ]}
                withTooltip
                {...props}
            />
        </div>
    )
}
``
export default MultipleUsersWithTooltip