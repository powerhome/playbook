import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
}

class UserBadge extends React.Component {
  render() {
    return (
      <div className="pb_user_badge">
        <span>{'USER BADGE CONTENT'}</span>
      </div>
    )
  }
}

UserBadge.propTypes = propTypes

export default UserBadge
