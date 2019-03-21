import React from 'react';
import PropTypes from "prop-types";
import classnames from 'classnames';
import Image from "../pb_image/_image.jsx";

const propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  url: PropTypes.string.isRequired
};

const defaultProps = {
  alt: "",
  size: "base"
};

class Avatar extends React.Component {
  render() {
    const {
      alt,
      className,
      size,
      url
    } = this.props;

    const css = classnames([
      `avatar-${size}`,
      className,
    ])

    return (
      <div className={css}>
        <Image alt={alt}
            url={url}
        />
      </div>
    )
  }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
