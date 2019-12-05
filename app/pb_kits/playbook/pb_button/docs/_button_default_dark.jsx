import React from 'react'
import {Button} from '../../'

const ButtonDefaultDark = () => (
    <div>
        <Button
            dark 
            text="Button Primary"
        />
        <Button
            dark
            text="Button Secondary"
            variant="secondary"
        />
        <Button
            dark
            text="Button Link"
            variant="link"
        />
        <Button
            dark
            disabled
            text="Button Disabled"
        />
    </div>
)

export default ButtonDefaultDark