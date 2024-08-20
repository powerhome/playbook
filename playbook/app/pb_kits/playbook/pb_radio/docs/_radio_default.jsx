import React from 'react'

import Radio from '../_radio'
import Typeahead from '../../pb_typeahead/_typeahead'

const RadioDefault = (props) => {
  const ref = React.createRef()


  const options = [
    { label: 'Orange', value: '#FFA500' },
    { label: 'Red', value: '#FF0000' },
    { label: 'Green', value: '#00FF00' },
    { label: 'Blue', value: '#0000FF' },
  ]

  return (
    <div>
      <Radio
          childrenPosition="right"
          label="Power"
          name="Group2"
          ref={ref}
          tabIndex={0}
          value="Power"
          {...props}
      >
        <Typeahead options={options}/>

      </Radio>
      <br />
      <Radio
          defaultChecked={false}
          label="Nitro"
          name="Group2"
          value="Nitro"
          {...props}
      >
        <Typeahead options={options}/>
      </Radio>
      <br />
      <Radio
          defaultChecked={false}
          label="Google"
          name="Group2"
          value="Google"
          {...props}
      />
    </div>
  )
}
export default RadioDefault
