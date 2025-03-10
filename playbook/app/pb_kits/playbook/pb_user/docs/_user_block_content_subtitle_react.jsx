import React from "react"

import Caption from '../../pb_caption/_caption'
import Contact from '../../pb_contact/_contact'
import Flex from '../../pb_flex/_flex'
import Icon from '../../pb_icon/_icon'
import User from '../../pb_user/_user'

const MentorSubtitle = (
  <Flex>
    <Icon icon="users" />
    <Caption
        paddingLeft="xs"
        text="Admin"
    />
  </Flex>
)

const ContactSubtitle = (
  <>
    <Contact
        contactType="cell"
        contactValue="349-185-9988"
    />
    <Contact
        contactValue="5555555555"
    />
    <Contact
        contactType="email"
        contactValue="email@example.com"
    />
  </>
)

const UserBlockContentSubtitleReact = (props) => {
  return (
    <div className="pb--doc-demo-row">
      <User
          align="left"
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          orientation="horizontal"
          subtitle={MentorSubtitle}
          territory="PHL"
          title="Remodeling Consultant"
          {...props}
      />

      <User
          align="left"
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          orientation="horizontal"
          subtitle={ContactSubtitle}
          {...props}
      />
    </div>
  )
}

export default UserBlockContentSubtitleReact
