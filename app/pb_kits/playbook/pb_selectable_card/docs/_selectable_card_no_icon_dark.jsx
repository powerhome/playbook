import React from "react"
import SelectableCard from "../_selectable_card.jsx"
import Icon from "../../pb_icon/_icon.jsx"


class SelectableCardNoIconDark extends React.Component {
  state = {
    movies: true,
    books: false
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
            dark
            id="movies"
            name="movies"
            value="movies"
            icon={false}
            checked={this.state.movies}
            onChange={this.handleSelect}
            onSelect={event => console.log(`${event.target.name} checked!`)}
            onUnselect={event => console.log(`${event.target.name} unchecked!`)}>
          I like movies
        </SelectableCard>

        <br></br>

        <SelectableCard
            dark
            id="books"
            name="books"
            value="books"
            icon={false}
            checked={this.state.books}
            onChange={this.handleSelect}
            onSelect={event => console.log(`${event.target.name} checked!`)}
            onUnselect={event => console.log(`${event.target.name} unchecked!`)}>
          I like books
        </SelectableCard>
      </div>
    )
  }
}

export default SelectableCardNoIconDark;
