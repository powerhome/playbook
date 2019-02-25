/* @flow */

import React from 'react'
import classnames from 'classnames'
import _ from 'lodash'

import Text from "../Text/Text"
import styles from './styles.scss'
import colors from '../../sass-mixins/base-variables/_colors-export.scss'

type Props = {
  children?: Array<React.Node>,
  colors: Object,
  className: string,
}

export default class Color extends React.Component<Props> {
  static defaultProps = {
    className: "",
    colors: colors,
  }
  props: Props
  render() {
    const {
      className,
      colors,
    } = this.props
    const css = [
      className,
      styles['color-swatch'],
    ]

    const colorMap = new Map(Object.entries(colors));
    let colorList = []
    colorMap.forEach(function(value, key, map) {
      colorList.push(
        <div className="col-sm-2 text-center mb-5" key={value}>
          <div className={classnames(css)} style={{backgroundColor: value }}></div>
          <div className="color-name"><Text color="ink-lighter" size="small">{key}</Text></div>
          <div className="color-value"><Text color="sky-dark" size="smaller">{value}</Text></div>

        </div>
      )
    });

    return (
      <div className="container my-5">
        <div className="row">
          {colorList}
        </div>
      </div>
    );

  }
}
