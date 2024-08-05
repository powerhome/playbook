import React from 'react'
import { Body } from 'playbook-ui'

const BodyBlock = (props) => {
    return (
        <>
            <Body
                lineHeight='loose'
                maxWidth='md'
                {...props}
            >
                <p>{`Infuse your life with action. Don't wait for it to happen. Make it happen. Make your own future. Make your own hope. Make your own love. And whatever your beliefs, honor your creator, not by passively waiting for grace to come down from upon high, but by doing what you can to make grace happen... yourself, right now, right down here on Earth.`}</p>
                <br />
                <p>{`- Bradley Whitford`}</p>
            </Body>
        </>
    )
}

export default BodyBlock
