/* @flow */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {Caption} from '../'

const propTypes = {
  className: PropTypes.string,
  dark: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ])
}

const defaultProps = {
  onChange: () => {},
  type: 'text'
}

class TextInput extends React.Component {
  render() {
    const {
      className,
      dark,
      name,
      label,
      onChange = () => {},
      placeholder,
      type,
      value
    } = this.props

    const css = classnames([
      `pb_text_input_kit${dark === true ? '_dark' : ''}`,
      className,
    ])

    return (
      <div className={css}>
        <Caption text={label} dark={dark} />
        <div className='text_input_wrapper'>
          <input className='text_input'
              name={name}
              onChange={onChange}
              placeholder={placeholder}
              type={type}
              value={value}
          />
        </div>
      </div>
    )
  }
}

TextInput.propTypes = propTypes
TextInput.defaultProps = defaultProps

export default TextInput
