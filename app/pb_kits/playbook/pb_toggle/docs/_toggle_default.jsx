// @flow

import React from 'react'
import { Toggle } from '../../'

class Example extends React.Component {
  state = {
    toggle1: false,
    toggle2: true,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    })
  }

  render() {
    return (
      <>
        <Toggle
            checked={this.state.toggle1}
            name="toggle1"
            onChange={this.handleChange}
            onCheck={(event) => alert(`${event.target.name} checked!`)}
            onUncheck={(event) => alert(`${event.target.name} unchecked!`)}
        />

        <br />

        <Toggle
            checked={this.state.toggle2}
            name="toggle2"
            onChange={this.handleChange}
            onCheck={(event) => alert(`${event.target.name} checked!`)}
            onUncheck={(event) => alert(`${event.target.name} unchecked!`)}
        />
      </>
    )
  }
}

export default Example
