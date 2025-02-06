import React from 'react'
import { Emptystate } from 'playbook-ui'
import { SectionSeparator } from 'playbook-ui'

const EmptystateDefault = (props) => (
  <>
    <div>
      <Emptystate
          {...props}
          description="Body text goes into detail with possible steps for user to take"
          header="This is a title header"
          image="https://component.gallery/static/8d36eaa25b6dcb026685101ebc379022/Empty%20state%20icon..svg"
          linkButton="Alt Action"
          orientation="vertical"
          primaryButton="Next Action"
          size="sm"
      />
    </div>
    <SectionSeparator padding="xl"/>
    <div>
      <Emptystate
          {...props}
          description="Body text goes into detail with possible steps for user to take"
          header="This is a title header"
          image="https://component.gallery/static/8d36eaa25b6dcb026685101ebc379022/Empty%20state%20icon..svg"
          linkButton="Alt Action"
          orientation="vertical"
          primaryButton="Next Action"
          size="md"
      />
    </div>
    <SectionSeparator padding="xl"/>
    <div>
      <Emptystate
          {...props}
          description="Body text goes into detail with possible steps for user to take"
          header="This is a title header"
          image="https://component.gallery/static/8d36eaa25b6dcb026685101ebc379022/Empty%20state%20icon..svg"
          linkButton="Alt Action"
          orientation="vertical"
          primaryButton="Next Action"
          size="lg"
      />
    </div>
    <SectionSeparator padding="xl"/>
    <div>
      <Emptystate
          {...props}
          description="Body text goes into detail with possible steps for user to take"
          header="This is a title header"
          image="https://component.gallery/static/8d36eaa25b6dcb026685101ebc379022/Empty%20state%20icon..svg"
          linkButton="Alt Action"
          orientation="horizontal"
          primaryButton="Next Action"
          size="sm"
      />
    </div>
    <SectionSeparator padding="xl"/>
    <div>
      <Emptystate
          {...props}
          description="Body text goes into detail with possible steps for user to take"
          header="This is a title header"
          image="https://component.gallery/static/8d36eaa25b6dcb026685101ebc379022/Empty%20state%20icon..svg"
          linkButton="Alt Action"
          orientation="horizontal"
          primaryButton="Next Action"
          size="md"
      />
    </div>
    <SectionSeparator padding="xl"/>
    <div>
      <Emptystate
          {...props}
          description="Body text goes into detail with possible steps for user to take"
          header="This is a title header"
          image="https://component.gallery/static/8d36eaa25b6dcb026685101ebc379022/Empty%20state%20icon..svg"
          linkButton="Alt Action"
          orientation="horizontal"
          primaryButton="Next Action"
          size="lg"
      />
    </div>
  </>

)

export default EmptystateDefault
