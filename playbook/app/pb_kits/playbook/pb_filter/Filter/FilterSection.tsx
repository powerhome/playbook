import React from 'react'

import Collapsible from '../../pb_collapsible/_collapsible'
import Caption from '../../pb_caption/_caption'

type FilterSectionProps = {
  children?: React.ReactChild[] | React.ReactChild,
  collapsible?: boolean,
  collapsed?: boolean,
  headerText?: string,
}
const FilterSection = ({ children, collapsible = false, collapsed = true, headerText, }: FilterSectionProps): React.ReactElement => {
  if (collapsible) {
    return (
      <Collapsible
          collapsed={collapsed}
          padding="none"
      >
        <Collapsible.Main
            paddingX="sm"
            paddingY="xs"
        >
            <Caption>{ headerText }</Caption>
        </Collapsible.Main>
        <Collapsible.Content
            className="filter_section_collapsible"
            paddingX="sm"
        >
          { children }
        </Collapsible.Content>
      </Collapsible>
    )
  }
  
  return (
    <>
      {headerText && <Caption>{ headerText }</Caption>}
      { children }
    </>
  )
}

export default FilterSection
