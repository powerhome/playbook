import React from "react"
import ColorPickerInput from './ColorPickerInput'

class Wrapper extends React.Component {
  state = {
    color: '#000'
  }

  handleOnChange = (color) => {
    this.setState({color})
  }

  render() {
    const {
      color,
    } = this.state

    const child = React.cloneElement(this.props.children, {
      color,
      onChange: this.handleOnChange,
    })

    return child
  }
}

export default function ColorPickerStory(stories) {
  stories.add("ColorPickerInput",
    () => {
      return (
        <Wrapper>
          <ColorPickerInput/>
        </Wrapper>
      )
    }
  )
}
