import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
}

class OnlineStatus extends React.Component {
  render() {
    return (
      <div className="pb_online_status">
        <span>{'ONLINE STATUS CONTENT'}</span>
      </div>
    )
  }
}

OnlineStatus.propTypes = propTypes

export default OnlineStatus
