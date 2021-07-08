import React from 'react'

import Message from '../_message'
import Image from '../../pb_image/_image'

const MessageDefault = (props) => {
  return (
    <div>
      <Message
          avatarName="Mike Bishop"
          avatarStatus="online"
          avatarUrl="https://randomuser.me/api/portraits/men/50.jpg"
          label="Anna Black"
          message="How can we assist you today?"
          timestamp="20 seconds ago"
          {...props}
      />

      <br />
      <br />

      <Message
          alignTimestamp="left"
          avatarName="Wade Winningham"
          avatarUrl="https://randomuser.me/api/portraits/men/14.jpg"
          label="Patrick Welch"
          message="We will escalate this issue to a Senior Support agent."
          timestamp="9 minutes ago"
          {...props}
      />

      <br />
      <br />

      <Message
          avatarName="Becca Jacobs"
          avatarUrl="https://randomuser.me/api/portraits/women/50.jpg"
          label="Lucille Sanchez"
          message="Application for Kate Smith is waiting for your approval"
          timestamp="2 days ago"
          {...props}
      />

      <br />
      <br />

      <Message
          avatarName="Timothy Wenhold"
          label="Beverly Reyes"
          message="We are so sorry you had a bad experience!"
          timestamp="2 days ago"
          {...props}
      />

      <br />
      <br />

      <Message
          label="Keith Craig"
          message="Please hold for one moment, I will check with my manager."
          timestamp="2 days ago"
          {...props}
      />

      <br />
      <br />

      <Message
          label="Keith Craig"
          timestamp="2 days ago"
          {...props}
      >
        <Image
            alt="picture of a misty forest"
            size="md"
            url="https://unsplash.it/500/400/?image=634"
        />
      </Message>

      <br />
      <br />

      <Message
          label="Keith Craig"
          message="Please hold for one moment, I will check with my manager."
          timestamp="2 days ago"
          {...props}
      >
        <Image
            alt="picture of a misty forest"
            size="md"
            url="https://unsplash.it/500/400/?image=634"
        />
      </Message>

    </div>
  )
}

export default MessageDefault
