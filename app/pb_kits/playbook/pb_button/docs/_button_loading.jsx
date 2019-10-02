import React from 'react'
import {Button} from '../../'

const ButtonLoading = () => (
    <div>
        <Button
            loading
            text="Button Primary"
        />
        <Button
            loading
            text="Button Secondary"
            variant="secondary"
        />
        <Button
            loading
            text="A Tag Button Disabled"
            variant="link"
        />
    </div>
)

export default ButtonLoading
