import React from 'react'
import {Button} from '../../'

const ButtonDefaultDark = () => (
    <div>
        <Button text="Button Primary" 
                dark
        />
        <Button
                text="Button Secondary"
                variant="secondary"
                dark
        />
        <Button
                text="Button Link"
                variant="link"
                dark
        />
        <Button
                text="Button Disabled"
                disabled
                dark
        />
    </div>
)

export default ButtonDefaultDark