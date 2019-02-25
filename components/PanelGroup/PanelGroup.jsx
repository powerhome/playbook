import React from "react"
import PropTypes from "prop-types"
import Icon from "../Icon/Icon"

import {
  Panel as BootstrapPanel,
  PanelGroup as BootstrapPanelGroup
} from "react-bootstrap"

import Text from '../Text/Text'

import "./PanelGroup.scss"

type PanelProps = {
  children?: string,
  icon?: any,
  name?: string,
  subtitle?: string,
  title?: string,
  toggleIconName?: string,
}

type PanelGroupProps = {
  activePanel?: string,
  className?: string,
  id?: string,
  inner?: boolean,
}

const Panel = ({ children, icon, name = Math.random(), subtitle, title, notification }: PanelProps, context) => {
  const collapsed = context.activePanel !== name
  const rotateProps = collapsed ? { rotate: 180 } : {}
  const css = collapsed ? "panel-collapsed" : ""

  return (
    <BootstrapPanel eventKey={name} className={css}>
      <BootstrapPanel.Heading bsStyle="default">
        <BootstrapPanel.Toggle className="panel-toggle">
          <If condition={icon}>
            <div className="heading-icon">{icon}</div>
          </If>

          <BootstrapPanel.Title>
            <Text className="title" bold>{title}</Text>

            <If condition={subtitle}>
              <Text color="ink-lightest" className="subtitle">{subtitle}</Text>
            </If>
          </BootstrapPanel.Title>

          <If condition={notification}>
            {notification}
          </If>

          <Icon className="icon-toggle" size="lg" {...rotateProps} name={context.toggleIconName} />
        </BootstrapPanel.Toggle>
      </BootstrapPanel.Heading>

      <BootstrapPanel.Body collapsible>{children}</BootstrapPanel.Body>
    </BootstrapPanel>
  )
}

Panel.defaultProps = {
  title: "",
  toggleIconName: "chevron-up"
}

Panel.contextTypes = {
  activePanel: PropTypes.string,
  toggleIconName: PropTypes.string,
}

export default class PanelGroup extends React.Component<PanelGroupProps> {
  static Panel = Panel

  static childContextTypes = {
    activePanel: PropTypes.string,
    toggleIconName: PropTypes.string,
  }

  static defaultProps = {
    id: `${Math.random()}`,
    inner: false,
    onPanelChange: () => {},
  }

  state = {
    activePanel: this.props.activePanel,
  }

  getChildContext() {
    return {
      activePanel: this.state.activePanel,
      toggleIconName: this.props.inner ? "angle-up" : "chevron-down "
    }
  }

  handleSelect = (activePanel) => {
    this.setState({ activePanel }, () => this.props.onPanelChange(activePanel));
  }

  componentWillReceiveProps({ activePanel }) {
    if (activePanel !== this.props.activePanel) {
      this.setState({ activePanel })
    }
  }

  render() {
    const { children, id, inner, className } = this.props
    return (
      <BootstrapPanelGroup id={id} accordion
        activeKey={this.state.activePanel}
        className={`nitro-panel-group ${className} ${inner ? "inner-panel-group": ""}`}
        onSelect={this.handleSelect}
      >
        {children}
      </BootstrapPanelGroup>
    );
  }
}
