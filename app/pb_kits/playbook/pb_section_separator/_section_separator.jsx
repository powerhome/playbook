import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class SectionSeparator extends React.Component {
  render() {
    return (
      <div className="pb_section_separator">
        <span>SECTION SEPARATOR CONTENT</span>
      </div>
    )
  }
}

SectionSeparator.propTypes = propTypes;

export default SectionSeparator;
