/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from "../pb_title/_title.jsx";
import Caption from "../pb_caption/_caption.jsx";
import Body from "../pb_body/_body.jsx";
import Icon from "../pb_icon/_icon.jsx";

const propTypes = {
  className: PropTypes.string,
  data: PropTypes.string,
  id: PropTypes.string,

};

const defaultProps = {
  className: '',
  data: '',
  id: ''
};

class OwnerProject extends Component {
  render() {
    const { className, data, id } = this.props;
    return (
      <div>
        <Caption text="Project"/>

        <Icon icon="home"/>
      </div>
    );
  }
}

export default OwnerProject;
