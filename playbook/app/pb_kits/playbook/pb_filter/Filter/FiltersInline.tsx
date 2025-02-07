import React from 'react'

import Flex from "../../pb_flex/_flex"
import FlexItem from "../../pb_flex/_flex_item"
import { GenericObject } from '../../types'

type FiltersInlineProps = {
  children?: React.ReactChild[] | React.ReactChild,
  inlineProps?: GenericObject,
}
const FiltersInline = ({ children }: FiltersInlineProps): React.ReactElement => {
  return (
    <div className="pb-form">
        <Flex
            orientation="row"
            paddingRight="lg"
            vertical="center"
        >
            {children.props.children.map((child, i) => (
                <FlexItem
                    key={i}
                    paddingRight="sm"
                >
                    {child}
                </FlexItem>
            ))}
        </Flex>
    </div>
  )
}

export default FiltersInline
