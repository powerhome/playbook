import React from "react"
import Message from "../_message"

const MessageDefault = (props) => {
    return (
        <>
            <Message
                avatarName='Keith Craig'
                label='Keith Craig'
                paddingBottom="md"
                timestamp='2 days ago'
                {...props}
            >
                <Message.Mention variant='user'>{'@all'}</Message.Mention>{` let's welcome `}
                <Message.Mention variant='self'>{'@Lucille Sanchez'}</Message.Mention>{' to the team this week!'}
            </Message>

            <Message
                avatarName='Lucille Sanchez'
                avatarUrl='https://randomuser.me/api/portraits/women/50.jpg'
                label='Lucille Sanchez'
                timestamp='2 days ago'
                {...props}
            >
                <Message.Mention variant='self'>{'@Keith Craig'}</Message.Mention>{` thanks for the warm welcome! I'm so excited!`}
            </Message>
        </>
    )
}

export default MessageDefault
