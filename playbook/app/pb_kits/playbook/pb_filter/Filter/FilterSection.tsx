import React from 'react'

import Collapsible from '../../pb_collapsible/_collapsible'
import Caption from '../../pb_caption/_caption'
import Body from '../../pb_body/_body'

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
    <Body
        paddingTop="xs"
        paddingX="sm"
    >
      <>
        {headerText && <Caption marginBottom="sm">{ headerText }</Caption>}
        { children }
      </>
    </Body>
  )
}

export default FilterSection
