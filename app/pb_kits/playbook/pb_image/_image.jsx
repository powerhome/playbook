import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
}

const defaultProps = {
  alt: '',
  url: '',
}

class Image extends Component {
  render() {
    const { alt, url } = this.props
    return (
      <img
          alt={alt}
          className="pb_image lazyload blur_up"
          data-src={url}
      />
    )
  }
}

Image.propTypes = propTypes
Image.defaultProps = defaultProps

export default Image
