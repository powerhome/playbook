import React from 'react'
import { components } from 'react-select'

import User from '../../pb_user/_user'

type OptionProps = {
  children: React.ReactNode,
  label?: string,
  data: {
    imageUrl?: string,
  },
  selectProps: {
    dark?: boolean,
    valueComponent?: (data: {
      imageUrl?: string,
    }) => React.ReactNode,
  },
}


const Option = (props: OptionProps): React.ReactElement => {
  const {
    imageUrl,
  } = props.data
  const { valueComponent } = props.selectProps

  return (
    <components.Option {...props}>
      <>
        {!valueComponent && imageUrl &&
          <User
              align="left"
              avatarUrl={imageUrl}
              dark={props.selectProps.dark}
              name={props.label}
              orientation="horizontal"
          />
        }

        {valueComponent &&
          valueComponent(props.data)
        }

        {!valueComponent && !imageUrl &&
          props.label
        }
      </>
    </components.Option>
  )
}

export default Option
