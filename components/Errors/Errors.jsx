/* @flow */

import React from 'react'
import { uniqueId } from 'lodash'
import { Alert } from 'react-bootstrap'

/**
* Errors
* Displays the given {@messages} in a list format, inside a red alert box.
*
* @param {Array<String>} props.messages The error messages to be displayed
*/

type Props = {
  messages: Array<string>,
}

export default class Errors extends React.Component<Props> {
  static defaultProps = {
    messages: ["Something went wong"]
  }
  props: Props
  render() {
    const { messages } = this.props
    return (
      <Alert
          bsStyle="danger"
          className="errors"
      >
        <ul>
          {messages.map(m => (
            <li key={uniqueId()}>{m}</li>
          ))}
        </ul>
      </Alert>
    )
  }
}
