/* @flow */

import React from 'react'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'

const isRequired = (boolean) => {
  if (boolean) {
    return "*"
  }
}

/**
 * TextInput renders a bootstrapped text input field.
 *
 * @param {string} className the CSS class name(s) for the outermost returned div.
 * @param {string} controlId the CSS id name for the <input> tag.
 * @param {string} label the text to use as a label.
 * @param {string} name the text to use as a name.
 * @param {func} onChange the function to be called when the React onChange event is triggered.
 * @param {string} placeholder the text to use as a placeholder.
 * @param {string} value the text to use as a value.
 * @param {string} type the type of input (i.e. 'text', 'number'). Defaults to 'text'.
 * @param {string} validationState react-bootstrap validation state of the input, either 'success', 'warning' or 'error'.
 * @param {boolean} requiredField indicates of the input is a required field.
 * @returns {ReactElement} JSX.
 */

type Props = {
  className: string,
  controlId: string,
  inputClassName: string,
  inputStyle: object,
  label: string,
  labelClassName: string,
  name: string,
  onChange: () => mixed,
  placeholder: string,
  requiredField: boolean,
  type: string,
  validationState: string,
  value: string,
}

export default class TextInput extends React.Component<Props> {
  static defaultProps = {
    className: "",
    inputClassName: "",
    inputStyle: {},
    labelClassName: "",
    type: "text",
    validationState: null,
  }
  props: Props
  render() {
    const {
      label,
      placeholder,
      className,
      labelClassName,
      inputClassName,
      inputStyle,
      controlId,
      value,
      onChange,
      name,
      requiredField,
      type,
      validationState,
    } = this.props

    return (
      <FormGroup
          className={className}
          controlId={controlId}
          validationState={validationState}
      >
        <ControlLabel className={labelClassName}>
          {label} <span>{isRequired(requiredField)}</span>
        </ControlLabel>
        {' '}
        <FormControl
            className={inputClassName}
            defaultValue={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            style={inputStyle}
            type={type}
        />
      </FormGroup>
    )
  }
}
