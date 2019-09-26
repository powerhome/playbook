/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

type AppointmentResultProps = {
  className?: String,
  dark?: Boolean,
  data?: String,
  id?: String,
  result?: 'option_1' | 'option_2',
  text?: String,
  user?: String,
  
}

const AppointmentResult = ({ className, dark, data, id, result, text, user }: AppointmentResultProps) => (
  <div>
    {`kit content`}
  </div>
)

export default AppointmentResult
