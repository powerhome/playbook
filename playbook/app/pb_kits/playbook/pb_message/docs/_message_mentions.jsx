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
                <Message.Mention variant='user'>{'@all'}</Message.Mention>{' please hold for one moment. I will check with my manager.'}
            </Message>

            <Message
                avatarName='Lucille Sanchez'
                avatarUrl='https://randomuser.me/api/portraits/women/50.jpg'
                label='Lucille Sanchez'
                paddingBottom="md"
                timestamp='2 days ago'
                {...props}
            >
                <Message.Mention variant='self'>{'@Keith Craig'}</Message.Mention>{' thanks. Keep us posted!'}
            </Message>

            <Message
                avatarName='Becca Jacobs'
                avatarUrl='https://randomuser.me/api/portraits/women/39.jpg'
                label='Becca Jacobs'
                timestamp='2 days ago'
            >
                {'Hello '}<Message.Mention variant='user'>{'@all'}</Message.Mention>{`, let's welcome`}
                <Message.Mention variant='self'>{'@Anna Black'}</Message.Mention>{' to the team this week.'}
            </Message>
        </>
    )
}

export default MessageDefault
