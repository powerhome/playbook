import React from "react"
import SearchCollectionSelect from './SearchCollectionSelect'

const options = [
  {label: "Bob Hope", value: 1},
  {label: "Drew Barrymore", value: 2},
  {label: "Ozzy Ozborne", value: 3},
  {label: "Donald Obama", value: 666},
]

class Wrapper extends React.Component {
  state = {
    value: [],
  }
  handleOnChange = (value) => {
    this.setState({value})
  }
  render() {
    const {children} = this.props
    return (
      <div className="container my-5">
        <div className="col-sm-6">
          {
            React.cloneElement(children, {
              onChange: this.handleOnChange,
              value: this.state.value,
            })
          }
        </div>
      </div>
    )
  }
}

export default function SearchCollectionSelectStory(stories) {
  stories.add("Search Collection Select",
    () => {
      return (
        <Wrapper>
          <SearchCollectionSelect
              async={false}
              options={options}
          />
        </Wrapper>
      )
    }
  )
}
