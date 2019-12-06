import React from "react"
import {
  Body,
  SelectableCard,
  Title
} from "../../"


class SelectableCardBlock extends React.Component {
  state = {
    chrome: true,
    firefox: false
  }

  handleSelect = event => {
    this.setState({
      [event.target.id]: event.target.checked
    })
  }

  render() {
    return (
      <div>
        <SelectableCard
            id="chrome"
            name="chrome"
            value="chrome"
            checked={this.state.chrome}
            onChange={this.handleSelect}
            onSelect={event => console.log(`${event.target.name} checked!`)}
            onUnselect={event => console.log(`${event.target.name} unchecked!`)}>
          <Title text="Browser" size={4} />
          <Body tag="span">I enjoy using Chrome</Body>
        </SelectableCard>

        <br></br>

        <SelectableCard
            id="firefox"
            name="firefox"
            value="firefox"
            checked={this.state.firefox}
            onChange={this.handleSelect}
            onSelect={event => console.log(`${event.target.name} checked!`)}
            onUnselect={event => console.log(`${event.target.name} unchecked!`)}>
          <Title text="Browser" size={4} />
          <Body tag="span">I enjoy using Firefox</Body>
        </SelectableCard>
      </div>
    )
  }
}

export default SelectableCardBlock;
