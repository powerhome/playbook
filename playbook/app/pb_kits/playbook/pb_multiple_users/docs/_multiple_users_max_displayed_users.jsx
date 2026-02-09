import React from 'react'
import Body from '../../pb_body/_body'
import MultipleUsers from '../_multiple_users'


const MultipleUsersMaxDisplayedUsers = (props) => {
    const status = () => (Math.random() < 0.5 ? 'Online' : 'Offline')
    const buildUser = (name, imageUrl) => ({ name, imageUrl, tooltip: `${name} - ${status()}` })

    const users = [
        buildUser("Patrick Welch", "https://randomuser.me/api/portraits/men/9.jpg"),
        buildUser("Lucille Sanchez", "https://randomuser.me/api/portraits/women/6.jpg"),
        buildUser("Beverly Reyes", "https://randomuser.me/api/portraits/women/74.jpg"),
        buildUser("Keith Craig", "https://randomuser.me/api/portraits/men/87.jpg"),
        buildUser("Alicia Cooper", "https://randomuser.me/api/portraits/women/20.jpg"),
        buildUser("Michelle Ellis", "https://randomuser.me/api/portraits/women/92.jpg"),
        buildUser("Clyde Mitchelle", "https://randomuser.me/api/portraits/men/39.jpg"),
        buildUser("Ellen Johnson", "https://randomuser.me/api/portraits/women/59.jpg"),
        buildUser("Eleanor Larson", "https://randomuser.me/api/portraits/women/46.jpg"),
        buildUser("Cody Cunningham", "https://randomuser.me/api/portraits/men/40.jpg"),
        buildUser("Thomas Parker", "https://randomuser.me/api/portraits/men/0.jpg"),
        buildUser("Frances Baker", "https://randomuser.me/api/portraits/men/46.jpg"),
        buildUser("Joseph Nguyen", "https://randomuser.me/api/portraits/women/42.jpg"),
    ]
    return (
        <div>
            <Body
                marginBottom={"md"}
                text={`Total Users: ${users.length}`}
            />
            <MultipleUsers
                maxDisplayedUsers={3}
                {...props}
                users={users}
            />
            <br />
            <br />
            <MultipleUsers
                maxDisplayedUsers={6}
                {...props}
                users={users}
                withTooltip
            />
            <br />
            <br />
            <MultipleUsers
                maxDisplayedUsers={9}
                {...props}
                reverse
                users={users}
            />
            <br />
            <br />
            <MultipleUsers
                maxDisplayedUsers={users.length - 1}
                {...props}
                users={users}
                withTooltip
            />
            <br />
            <br />
            <MultipleUsers
                maxDisplayedUsers={users.length + 1}
                {...props}
                users={users}
            />
        </div>
    )
}

export default MultipleUsersMaxDisplayedUsers
