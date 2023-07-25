import React from "react"

import Message from "../_message"
import Highlight from "../../pb_highlight/_highlight"

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
                <Highlight
                    backgroundColor='blue'
                    borderRadius="xs"
                    highlightedText={['@all']}
                    padding="xxs"
                    text="@all, please hold for one moment. I will check with my manager."
                    textColor='primary'
                    {...props}
                />
            </Message>

            <Message
                avatarName='Lucille Sanchez'
                avatarUrl='https://randomuser.me/api/portraits/women/50.jpg'
                label='Lucille Sanchez'
                {...props}
            >

                <Highlight
                    backgroundColor='yellow'
                    borderRadius="xs"
                    highlightedText={['@Keith Craig']}
                    padding="xxs"
                    text="@Keith Craig, application for Kate Smith is waiting for your approval."
                    textColor='primary'
                    {...props}
                />
            </Message>
        </>
    )
}

export default MessageDefault
