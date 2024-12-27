import React from 'react'
import { components } from 'react-select'

import User from '../../pb_user/_user'

import { OptionProps, GroupBase } from 'react-select'
import SelectProps from 'react-select'

interface OptionData {
  imageUrl?: string;
  label: string;
  dark?: boolean;
}

interface CustomSelectProps extends SelectProps {
  valueComponent?: (data: OptionData) => JSX.Element;
}

const Option = (props: OptionProps<OptionData, boolean, GroupBase<OptionData>> & { selectProps: CustomSelectProps }): JSX.Element => {
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
              dark={props.data.dark}
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
