import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class User extends React.Component {
  render() {
    return (
      <div className="pb_user">
        <span>USER CONTENT</span>
      </div>
    )
  }
}

User.propTypes = propTypes;

export default User;
