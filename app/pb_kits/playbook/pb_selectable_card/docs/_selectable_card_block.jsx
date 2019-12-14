import React from 'react'
import {
  Body,
  SelectableCard,
  Title,
} from '../../'

class SelectableCardBlock extends React.Component {
  state = {
    block: true,
    tag: false,
  }

  handleSelect = (event) => {
    this.setState({
      [event.target.id]: event.target.checked,
    })
  }

  render() {
    return (
      <div className="pb--doc-demo-row">

        <SelectableCard
            checked={this.state.block}
            inputId="block"
            name="block"
            onChange={this.handleSelect}
            value="block"
        >
          <Title
              size={4}
              text="Block"
          />
          <Body tag="span">{'This uses block'}</Body>
        </SelectableCard>

        <SelectableCard
            checked={this.state.tag}
            inputId="tag"
            name="tag"
            onChange={this.handleSelect}
            text="This passes text through the tag"
            value="tag"
        />

      </div>
    )
  }
}

export default SelectableCardBlock
