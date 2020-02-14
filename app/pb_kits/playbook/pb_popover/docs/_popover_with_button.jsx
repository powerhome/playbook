import React from 'react'
import {
  Button,
  PbReactPopover,
} from '../..'

export default class PopoverWithButton extends React.Component {
  state = {
    showPopover: false,
  }

  handleTogglePopover = () => {
    this.setState({ showPopover: !this.state.showPopover })
  }

  render() {
    const popoverReference = (
      <Button
          onClick={this.handleTogglePopover}
          text="Button Secondary"
          variant="secondary"
      />
    )

    return (
      <PbReactPopover
          placement="bottom"
          reference={popoverReference}
          show={this.state.showPopover}
      >
        {'Whoa. I\'m a popover.'}
      </PbReactPopover>
    )
  }
}
