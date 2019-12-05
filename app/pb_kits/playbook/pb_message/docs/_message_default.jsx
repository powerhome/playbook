import React from "react"
import { Message } from "../../"

function MessageDefault() {
  return (
    <div>

      <Message
        label='Message'
        avatarName='Mike Bishop'
        message='How can we assist you today?'
        timestamp='20 seconds ago'
        avatarUrl='https://randomuser.me/api/portraits/men/50.jpg'
        avatarStatus="online"
      />

      <br/><br/>

      <Message
        label='Support'
        avatarName='Wade Winningham'
        message='We will escalate this issue to a Senior Support agent.'
        timestamp='9 minutes ago'
        avatarUrl='https://randomuser.me/api/portraits/men/14.jpg'
      />

      <br/><br/>

      <Message
        avatarName='Lisa Thompson'
        message='To processs your order, I will need your full name.'
        timestamp='4 hours ago'
        avatarUrl='https://randomuser.me/api/portraits/women/39.jpg'
      />

      <br/><br/>

      <Message
        avatarName='Becca Jacobs'
        label='Application'
        message='Application for Kate Smith is waiting for your approval'
        timestamp='2 days ago'
        avatarUrl='https://randomuser.me/api/portraits/women/50.jpg'
      />

      <br/><br/>

      <Message
        avatarName='Timothy Wenhold'
        label='Complaint'
        message='We are so sorry you had a bad experience!'
        timestamp='2 days ago'
      />

      <br/><br/>

      <Message
        label='Support'
        message='Please hold for one moment, I will check with my manager.'
        timestamp='2 days ago'
      />

    </div>
  )
}

export default MessageDefault
