import React from 'react'
import classnames from 'classnames'
import Card from '../Card/Card'
import Icon from '../Icon/Icon'
import AnimateHeight from 'react-animate-height'
import { Button } from "react-bootstrap"


export type CollapsibleCardProps = {
  children: React.ChildrenArray<React.Element<typeof Main | Content >>,
  className: string,
}

const CollapsibleCardMain = () => null;
const CollapsibleCardContent = () => null;

class CollapsibleCard extends React.Component<Props> {
  static CollapsibleCardMain: Function
  static CollapsibleCardContent: Function

  static defaultProps = {
    children: null,
  }

  props: Props

  state = {
    height: 0,
  }

  constructor() {
    super()
  }

  toggleExpand() {
    const { height } = this.state;

    this.setState({
      height: height === 0 ? 'auto' : 0,
    })
  }

  renderTop() {
    const { children } = this.props;
    const content = React.Children.map(children, child => {
      if (child.type.displayName === 'CollapsibleCardMain' || child.type.name === 'CollapsibleCardMain') {
        return React.cloneElement(child)
      }
    });
    return (
      <div className="collapsible-card-top-content">{content.length > 0 ? content[0].props.children : '' }</div>
    );
  }

  renderContent() {
    const { children } = this.props;
    const height = this.state.height;
    const content = React.Children.map(children, child => {
      if (child.type.displayName === 'CollapsibleCardContent' || child.type.name === 'CollapsibleCardContent') {
        return React.cloneElement(child)
      }
    });
    return (
      <AnimateHeight
        duration={ 500 }
        height={ height }
        className="collapsible-card-hidden"
      >
        <div className="collapsible-card-hidden-content">
          {content.length > 0 ? content[0].props.children : '' }
        </div>
      </AnimateHeight>
    );
  }

  render() {
    const {
      children,
      className,
      main,
    } = this.props
    const { height } = this.state
    const css = classnames([
      "collapsible-card",
      className
    ])



    return (
      <Card className={css}>
        {this.renderTop()}
        <Button className={'btn-default btn-card-toggle'} onClick={() => this.toggleExpand()} >
          <If condition={height === 0}>
            <Icon name="chevron-down" />
          <Else/>
            <Icon name="chevron-up" />
          </If>
        </Button>
        {this.renderContent()}
      </Card>
    )
  }
}

CollapsibleCard.Main = CollapsibleCardMain
CollapsibleCard.Content = CollapsibleCardContent
export default CollapsibleCard
