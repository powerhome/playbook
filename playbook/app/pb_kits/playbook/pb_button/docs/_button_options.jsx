import React from 'react'
import { Button } from '../../'

const ButtonOptions = (props) => (
  <div>
    <Button
        htmlType="submit"
        onClick={() => alert('Click!')}
        tabIndex={0}
        text="Button with options"
        value="1234"
        {...props}
    />
  </div>
)

export default ButtonOptions
