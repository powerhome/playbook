/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'

//  Card props
/*
type CardPropTypes = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String,
  header?: {
    padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    color?: String
  }
  bodyPadding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
}

// Establishing css classes
const CardTest = ({
  children,
  className,
  header = {},
  bodyPadding = 'md',
}: CardPropTypes) => {
	const mainCSS = buildCss('pb_card_kit', className)
  const headerCSS = buildCss('pb_card_header_kit', {
		[`header_${header.padding}`]: header.padding,
		[`header_${header.color}`]: header.color,
	})
  const bodyCSS = buildCss('pb_card_body_kit', bodyPadding)
}
*/

// FindByType util
const findByType = (children, component) => {
const result = [];
/* This is the array of result since Article can have multiple times the same sub-component */
const type = [component.displayName] || [component.name];
/* We can store the actual name of the component through the displayName or name property of our sub-component */
React.Children.forEach(children, child => {
    const childType =
    child && child.type && (child.type.displayName || child.type.name);
    if (type.includes(childType)) {
    result.push(child);
    }
});

/* Then we go through each React children, if one of matches the name of the sub-component we’re looking for we put it in the result array */
return result[0];
};


// We instantiate the sub-components
const Header = () => null;
const Body = () => null;


//  Creating a class called CardTest
class CardTest extends React.Component {

	// This is the function that will take care of rendering our Header sub-component
	renderHeader () {
		const { children } = this.props;
		// First we try to find the Header sub-component among the children of Article
		const header = findByType(children, Header);
		// If there is a header, then return Header sub-component
		if (header) {
			return (
				<div className={'pb_card_header_kit_md_royal'}>
					{children}
				</div>
			)
		}
		// Else we return null
		return null;
	}
		
	renderBody () {
		const { children } = this.props;
		const body = findByType(children, Body);
		if (body) {
			return (
				<div className={'pb_card_body_kit_md'}>
					{children}
				</div>
			)
		}
		return null;
	}

	render () {
		const { children, className } = this.props;
		return (
			<CardTest>
			</CardTest>
		);
	}
}

// Lastly we expose the Title sub-component through Article
CardTest.Header = Header;
CardTest.Body = Body;

export default CardTest
