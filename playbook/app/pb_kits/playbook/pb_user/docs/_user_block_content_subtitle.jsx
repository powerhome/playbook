import React from "react"
import { Caption, Contact, Flex, Icon, User } from "../../"

const MentorSubtitle = (
  <Flex>
    <Icon icon="users" />
    <Caption
        paddingLeft="xs"
        text="Mentor"
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

const UserBlockContentSubtitle = (props) => {
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

export default UserBlockContentSubtitle
