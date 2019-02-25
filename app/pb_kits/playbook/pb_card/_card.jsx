import React from 'react';

class Card extends React.Component {
  render() {
    return (
      <div className="pb_card">
        <h1>
           I am card-React, {this.props.name}
        </h1>
        <div className="pb_card_body">
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default Card;
