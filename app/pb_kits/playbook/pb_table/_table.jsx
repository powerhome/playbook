import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  container: PropTypes.bool,
  dark: PropTypes.bool,
  disableHover: PropTypes.bool,
  singleLine: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
}

const defaultProps = {
  container: true,
  dark: false,
  disableHover: false,
  singleLine: false,
  size: 'sm',
}

class Table extends React.Component {
  render() {
    const {
      children,
      className,
      container,
      dark,
      disableHover,
      singleLine,
      size,
    } = this.props

    const css = classnames([
      'pb_table',
      `table-${size}`,
      container ? 'table-card' : null,
      dark ? 'table-dark' : null,
      singleLine ? 'single-line' : null,
      disableHover ? 'no-hover' : null,
      className,
    ])

    return (
      <div>
        <table className={css}>
          {children}
        </table>
      </div>
    )
  }
}

Table.propTypes = propTypes
Table.defaultProps = defaultProps

export default Table
