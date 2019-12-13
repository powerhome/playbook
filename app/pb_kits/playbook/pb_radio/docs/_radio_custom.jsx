import React from 'react'
import {Radio} from '../../'

function RadioCustom() {
  return (
    <div>
      <Radio className="my_custom_class" text="power" name="group 1" value="power">
        {`Power`}
      </Radio>
      <br/>
      <Radio className="my_custom_class" text="nitro" name="group 1" value="nitro">
        {`Nitro`}
      </Radio>
      <br/>
      <Radio className="my_custom_class" text="google" name="group 1" value="google">
        {`Google`}
      </Radio>
    </div>
  )
}
export default RadioCustom
