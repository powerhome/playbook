import React, { Component } from "react";
import PropTypes from "prop-types";


const propTypes = {
  url: PropTypes.string.isRequired
};

const defaultProps = {
  url: ''
};


class Image extends Component {
  render() {
    const { url } = this.props;
    return (
      <img 
          alt="test"
          className={"lazyload blur-up"}
          data-src={url}
      />
    );
  }
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
