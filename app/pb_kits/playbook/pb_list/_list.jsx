import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  dark: PropTypes.bool,
  borderless: PropTypes.bool,
  size: PropTypes.oneOf(['', 'large']),
  ordered: PropTypes.bool,
  layout: PropTypes.oneOf(['', 'left', 'right']),
  xpadding: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

const defaultProps = {
  dark: false,
  borderless: false,
  size: '',
  ordered: false,
  layout: '',
  xpadding: false,
}

class List extends Component {
  render() {
    const {
      dark,
      borderless,
      size,
      ordered,
      layout,
      xpadding,
      children,
    } = this.props
    const darkClass = dark === true ? '_dark' : ''
    const borderlessClass = borderless === true ? 'list_borderless' : ''
    const sizeClass = '_' + size
    const orderedClass = ordered === true ? '_ordered' : ''
    const layoutClass = '_' + layout
    const xpaddingClass = xpadding === true ? '_xpadding' : ''

    return (
      <div className={`pb_list${darkClass}${borderlessClass}${sizeClass}${orderedClass}${layoutClass}${xpaddingClass}`}>
        <ul>
          {children}
        </ul>
      </div>
    )
  }
}

List.propTypes = propTypes
List.defaultProps = defaultProps

export default List
