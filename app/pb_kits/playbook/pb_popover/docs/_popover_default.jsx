import React from 'react'
import {
  PbReactPopover,
} from '../..'

export default class PopoverDefault extends React.Component {
  state = {
    showPopover: false,
  }

  handleTogglePopover = () => {
    this.setState({ showPopover: !this.state.showPopover })
  }

  render() {
    const popoverReference = (
      <span onClick={this.handleTogglePopover}>{'Click me.'}</span>
    )

    return (
      <PbReactPopover
          reference={popoverReference}
          show={this.state.showPopover}
      >
        {'Whoa. I\'m a popover.'}
      </PbReactPopover>
    )
  }
}
