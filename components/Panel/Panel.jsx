/* @flow */

import React, { Component } from 'react'
import classnames from 'classnames'
import { isEmpty } from 'lodash'
import FontAwesome from 'react-fontawesome'
import Text from '../Text/Text'

type Props = {
  bodyClass?: string,
  children: Array<Component>,
  className?: string,
  collapsed?: boolean,
  collapsible?: boolean,
  headingLinks?: Array<Component>,
  title?: string,
  titleIcon?: string,
  subTitle?: string,
}

import styles from './panel.scss'

export default class Panel extends Component<Props> {
  static defaultProps = {
    className: "panel-default",
    collapsed: false,
    collapsible: false,
  }

  state = {
    collapsed: false,
  }

  componentWillMount() {
    this.setState({collapsed: this.props.collapsed})
  }

  props: Props

  renderHeadingLinks() {
    const {
      headingLinks,
    } = this.props
    if(!headingLinks) return null
    return (
      <div className="panel-links">
        {headingLinks.map()}
      </div>
    )
  }

  renderHeadingTitle() {
    const {
      title,
      titleIcon,
      subTitle,
    } = this.props
    return (
      <h3 className={classnames("panel-title", styles["panel-title"])}>
        <If condition={titleIcon}>
          <FontAwesome
              className={classnames("mr-3 ml-4", styles.icon)}
              name={titleIcon}
          />
        </If>
        <div>
          <Text
              bold
              className={titleIcon ? styles[`${subTitle ? 'panel-title-main-subtitled' : 'panel-title-main'}`] : null}
              size="large"
          >
            {title}
          </Text>
          <If condition={subTitle}>
            <Text
                className={classnames("clearfix", styles["panel-title-subtitle"])}
                size="smallest"
            >
              {subTitle}
            </Text>
          </If>
        </div>
      </h3>
    )
  }

  renderToggle() {
    const {collapsed} = this.state
    return (
      <FontAwesome
          className={styles.toggle}
          name={`chevron-circle-${collapsed ? 'down' : 'up'}`}
      />
    )
  }

  renderBody() {
    const {
      children,
      collapsible,
      bodyClass,
    } = this.props

    if (collapsible && this.state.collapsed) return

    return (
      <div className={classnames("panel-body", bodyClass)}>
        {children}
      </div>
    )
  }

  render() {
    const {
      className,
      collapsible,
      title,
      headingLinks,
    } = this.props

    const {
      collapsed,
    } = this.state

    const css = [
      styles.panel,
      "panel",
      collapsed ? styles["panel-collapsed"] : null,
      collapsible ? styles["panel-collapsible"] : null,
      className,
    ]

    const toggleCollapsed = () => {
      this.setState({collapsed: !this.state.collapsed})
    }

    return (
      <div className={classnames(css)}>
        <If condition={!isEmpty(title) || !isEmpty(headingLinks)}>
          <div
              className="panel-heading clearfix"
              onClick={toggleCollapsed}
          >
            <div className={`p-0 ${collapsible ? 'col-xs-6 col-sm-6 col-md-6' : 'col-sm-12 col-md-12'}`}>
              {this.renderHeadingLinks()}
              {this.renderHeadingTitle()}
            </div>
            <If condition={collapsible}>
              <div className="p-0 col-md-6 text-right">
                {this.renderToggle()}
              </div>
            </If>
          </div>
        </If>
        {this.renderBody()}
      </div>
    )
  }
}
