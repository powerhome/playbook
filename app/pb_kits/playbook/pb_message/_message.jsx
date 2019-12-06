import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class Message extends React.Component {
  render() {
    return (
      <div className="pb_message">
        <span>MESSAGE CONTENT</span>
      </div>
    )
  }
}

Message.propTypes = propTypes;

export default Message;
