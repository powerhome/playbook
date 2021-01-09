import React from 'react'
import {
  Body,
  Image,
  SelectableCard,
} from '../../'

class SelectableCardImage extends React.Component {
  state = {
    selectableImage: true,
    unselectedImage: false,
  }

  handleSelect = (event) => {
    this.setState({
      [event.target.id]: event.target.checked,
    })
  }

  render(props) {
    return (
      <div className="pb--doc-demo-row">

        <SelectableCard
            checked={this.state.selectableImage}
            icon
            inputId="selectableImage"
            name="selectableImage"
            onChange={this.handleSelect}
            value="selectableImage"
            {...props}
        >
          <Image
              rounded
              size="xl"
              url="https://unsplash.it/500/400/?image=634"
              {...props}
          />

          <Body>{'Add text here'}</Body>
        </SelectableCard>

        <SelectableCard
            checked={this.state.unselectedImage}
            icon
            inputId="unselectedImage"
            name="unselectedImage"
            onChange={this.handleSelect}
            value="unselectedImage"
            {...props}
        >
          <Image
              rounded
              size="xl"
              url="https://unsplash.it/500/400/?image=634"
              {...props}
          />
        </SelectableCard>

      </div>
    )
  }
}

export default SelectableCardImage
