import React, { Component } from "react"
import PropTypes from "prop-types"

const propTypes = {
  dark:PropTypes.bool,
  borderless:PropTypes.bool,
  size:PropTypes.oneOf(["", "large"]),
  ordered:PropTypes.bool,
  layout: PropTypes.oneOf(["", "left", "right"]),
  xpadding:PropTypes.bool,
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ])
}

const defaultProps = {
  dark:false,
  borderless:false,
  size:"",
  ordered:false,
  layout:"",
  xpadding:false
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
      children
    } = this.props
    const dark_class = dark === true ? "_dark" : ""
    const borderless_class = borderless === true ? "list_borderless" : ""
    const size_class = "_" + size
    const ordered_class = ordered === true ? "_ordered" : ""
    const layout_class = "_"+ layout
    const xpadding_class = xpadding === true ? "_xpadding" : ""
    return (
      <div className={`pb_list${dark_class}${borderless_class}${size_class}${ordered_class}${layout_class}${xpadding_class}`}>
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
