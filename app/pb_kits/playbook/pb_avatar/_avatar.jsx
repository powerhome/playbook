import React from 'react';
import PropTypes from "prop-types";
import classnames from 'classnames';
import { map } from 'lodash';
import Image from "../pb_image/_image.jsx";

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  url: PropTypes.string
};

const defaultProps = {
  name: null,
  size: "base"
};

const initials = function(name) {
  if (name) {
    return map(name.split(/\s/), name => name[0]).join('').substring(0,2)
  }
};

const image = function(url, name) {
  if (url) {
    return (
      <Image alt={name}
          url={url}
      />
    )
  }
};

class Avatar extends React.Component {
  render() {
    const {
      className,
      name,
      size,
      url
    } = this.props;

    const css = classnames([
      `avatar_${size}`,
      className,
    ])

    return (
      <div className={css}
          data-initials={initials(name)}
      >
        {image(url, name)}
      </div>
    )
  }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
