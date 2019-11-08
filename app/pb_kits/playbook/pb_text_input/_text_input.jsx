import React from 'react'
import PropTypes from "prop-types"
import classnames from 'classnames'
import {Caption} from "../"

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ])
}

const defaultProps = {
  type: "text"
}

class TextInput extends React.Component {
  render() {
    const {
      className,
      name,
      label,
      placeholder,
      type,
      value
    } = this.props

    const css = classnames([
      `pb_text_input_kit`,
      className,
    ])

    return (
      <div className="pb_text_input_kit">
        <Caption text={label} />
        <div className="text_input_wrapper">
          <input className={css}
              name={name}
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
