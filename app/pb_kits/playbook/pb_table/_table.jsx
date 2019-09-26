import React from 'react';
import classnames from 'classnames';
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]),
  className: PropTypes.string,
  container: PropTypes.bool,
  dark: PropTypes.bool,
  disable_hover: PropTypes.bool,
  single_line: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg"])
};

const defaultProps = {
  container: false,
  dark: false,
  disable_hover: false,
  single_line: false,
  size: "sm"
};

class Table extends React.Component {
  render() {
    const {
      children,
      className,
      container,
      dark,
      disable_hover,
      single_line,
      size
    } = this.props;

    const css = classnames([
      'pb_table',
      `table-${size}`,
      container ? `table-card` : null,
      dark ? `table-dark` : null,
      single_line ? `single-line` : null,
      disable_hover ? `no-hover` : null,
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

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
