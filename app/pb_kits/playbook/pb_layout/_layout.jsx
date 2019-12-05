import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  transparent: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'base', 'lg', 'xl']),
  collapse: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  full: PropTypes.bool,
  dark: PropTypes.bool,
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ])
}

const defaultProps = {
  position: 'left',
  transparent: false,
  size: 'base',
  collapse: 'md',
  full: false,
  dark: false
}

class Layout extends Component {
  render() {
    const {
      position,
      transparent,
      size,
      collapse,
      full,
      dark,
      children
    } = this.props
    const dark_class = dark === true ? '_dark' : ''
    const transparent_class = transparent === true ? '_transparent' : ''
    const full_class = full === true ? ' full' : ''
    const size_class = '_'+size
    const position_class = '_'+position
    const collapse_class = ' layout'+position_class+'_collapse_'+collapse
    return (
      <div className={`pb_layout${size_class}${position_class}${dark_class}${transparent_class}${full_class}${collapse_class}`}>
        {children}
      </div>
    )
  }
}

Layout.propTypes = propTypes
Layout.defaultProps = defaultProps

export default Layout
