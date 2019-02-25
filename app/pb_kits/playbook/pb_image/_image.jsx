import React, { Component } from "react";
import PropTypes from "prop-types";
import { lazyload } from 'react-lazyload';


const propTypes = {
  url: PropTypes.string.isRequired
};

const defaultProps = {
  url: ''
};

@lazyload({
  height: '100%',
  once: true,
  offset: 100
})
class Image extends Component {
  render() {
    const { url } = this.props;
    return (  
      <img src={url} alt="test"/>
    );
  }
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
