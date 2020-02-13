import React from 'react'
import {
  Button,
  List,
  ListItem,
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
      <div style={{ height: '400px', textAlign: 'center' }}>
        <PbReactPopover
            offset
            placement="bottom"
            reference={popoverReference}
            show={this.state.showPopover}
        >
          <List>
            <ListItem>{'Popularity'}</ListItem>
            <ListItem>{'Title'}</ListItem>
            <ListItem>{'Duration'}</ListItem>
            <ListItem>{'Date Started'}</ListItem>
            <ListItem>{'Date Ended'}</ListItem>
          </List>
        </PbReactPopover>
      </div>
    )
  }
}
