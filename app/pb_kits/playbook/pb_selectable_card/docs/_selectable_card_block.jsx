import React from "react"
import {
  Body,
  SelectableCard,
  Title
} from "../../"

class SelectableCardBlock extends React.Component {
  state = {
    block: true,
    tag: false
  }

  handleSelect = event => {
    this.setState({
      [event.target.id]: event.target.checked
    })
  }

  render() {
    return (
      <div class="pb--doc-demo-row">

        <SelectableCard
            id="block"
            name="block"
            value="block"
            checked={this.state.block}
            onChange={this.handleSelect}>
          <Title text="Block" size={4} />
          <Body tag="span">This uses block</Body>
        </SelectableCard>

        <SelectableCard
            id="tag"
            name="tag"
            value="tag"
            checked={this.state.tag}
            onChange={this.handleSelect}
            text="This passes text through the tag">
        </SelectableCard>

      </div>
    )
  }
}

export default SelectableCardBlock;