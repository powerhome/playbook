import React from "react"
import { Message } from "../../"

function MessageDefault() {
  return (
    <div>

      <Message
          avatarName='Mike Bishop'
          avatarStatus="online"
          avatarUrl='https://randomuser.me/api/portraits/men/50.jpg'
          label='Message'
          message='How can we assist you today?'
          timestamp='20 seconds ago'
      />

      <br /><br />

      <Message
          avatarName='Wade Winningham'
          avatarUrl='https://randomuser.me/api/portraits/men/14.jpg'
          label='Support'
          message='We will escalate this issue to a Senior Support agent.'
          timestamp='9 minutes ago'
      />

      <br /><br />

      <Message
          avatarName='Lisa Thompson'
          avatarUrl='https://randomuser.me/api/portraits/women/39.jpg'
          message='To processs your order, I will need your full name.'
          timestamp='4 hours ago'
      />

      <br /><br />

      <Message
          avatarName='Becca Jacobs'
          avatarUrl='https://randomuser.me/api/portraits/women/50.jpg'
          label='Application'
          message='Application for Kate Smith is waiting for your approval'
          timestamp='2 days ago'
      />

      <br /><br />

      <Message
          avatarName='Timothy Wenhold'
          label='Complaint'
          message='We are so sorry you had a bad experience!'
          timestamp='2 days ago'
      />

      <br /><br />

      <Message
          label='Support'
          message='Please hold for one moment, I will check with my manager.'
          timestamp='2 days ago'
      />

    </div>
  )
}

export default MessageDefault
