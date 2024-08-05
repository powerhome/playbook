import React from 'react'
import { Collapsible } from 'playbook-ui'

const CollapsibleSize = (props) => (
  <div>
    <Collapsible
        iconSize="xs"
        marginBottom="xs"
    >
      <Collapsible.Main {...props}>
        <div>{'Extra Small Section'}</div>
      </Collapsible.Main>
      <Collapsible.Content>
        <div>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat sed purus hendrerit viverra. Duis et vestibulum metus. Sed consequat ut ante non vehicula. Etiam nunc massa, pharetra vel quam id, posuere rhoncus quam. Quisque imperdiet arcu enim, nec aliquet justo auctor eget. Curabitur in metus nec nunc rhoncus faucibus vitae ac elit. Nulla facilisi. Vestibulum quis pretium nulla. Nulla ut accumsan velit. Duis varius urna sed sem tempor, sit amet fermentum nibh auctor. Praesent lorem arcu, egestas non ante quis, placerat pellentesque lectus.Vestibulum lacinia ipsum quis venenatis tristique. Vivamus suscipit, libero eu fringilla egestas, orci urna commodo arcu, vel gravida turpis ipsum molestie nibh. Donec cursus eu ante sagittis ultrices. Phasellus id sagittis risus. Mauris dapibus neque faucibus, tempor ligula vel, cursus ante. Donec faucibus gravida porta. Nullam egestas est quis aliquam feugiat. Sed eget metus diam. Cras eget placerat libero.'
          }
        </div>
      </Collapsible.Content>
    </Collapsible>
    <Collapsible
        iconSize="sm"
        marginBottom="xs"
    >
      <Collapsible.Main {...props}>
        <div>{'Small Section'}</div>
      </Collapsible.Main>
      <Collapsible.Content>
        <div>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat sed purus hendrerit viverra. Duis et vestibulum metus. Sed consequat ut ante non vehicula. Etiam nunc massa, pharetra vel quam id, posuere rhoncus quam. Quisque imperdiet arcu enim, nec aliquet justo auctor eget. Curabitur in metus nec nunc rhoncus faucibus vitae ac elit. Nulla facilisi. Vestibulum quis pretium nulla. Nulla ut accumsan velit. Duis varius urna sed sem tempor, sit amet fermentum nibh auctor. Praesent lorem arcu, egestas non ante quis, placerat pellentesque lectus.Vestibulum lacinia ipsum quis venenatis tristique. Vivamus suscipit, libero eu fringilla egestas, orci urna commodo arcu, vel gravida turpis ipsum molestie nibh. Donec cursus eu ante sagittis ultrices. Phasellus id sagittis risus. Mauris dapibus neque faucibus, tempor ligula vel, cursus ante. Donec faucibus gravida porta. Nullam egestas est quis aliquam feugiat. Sed eget metus diam. Cras eget placerat libero.'
          }
        </div>
      </Collapsible.Content>
    </Collapsible>
    <Collapsible
        marginBottom="xs"
    >
      <Collapsible.Main {...props}>
        <div>{'Default Section'}</div>
      </Collapsible.Main>
      <Collapsible.Content>
        <div>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat sed purus hendrerit viverra. Duis et vestibulum metus. Sed consequat ut ante non vehicula. Etiam nunc massa, pharetra vel quam id, posuere rhoncus quam. Quisque imperdiet arcu enim, nec aliquet justo auctor eget. Curabitur in metus nec nunc rhoncus faucibus vitae ac elit. Nulla facilisi. Vestibulum quis pretium nulla. Nulla ut accumsan velit. Duis varius urna sed sem tempor, sit amet fermentum nibh auctor. Praesent lorem arcu, egestas non ante quis, placerat pellentesque lectus.Vestibulum lacinia ipsum quis venenatis tristique. Vivamus suscipit, libero eu fringilla egestas, orci urna commodo arcu, vel gravida turpis ipsum molestie nibh. Donec cursus eu ante sagittis ultrices. Phasellus id sagittis risus. Mauris dapibus neque faucibus, tempor ligula vel, cursus ante. Donec faucibus gravida porta. Nullam egestas est quis aliquam feugiat. Sed eget metus diam. Cras eget placerat libero.'
          }
        </div>
      </Collapsible.Content>
    </Collapsible>
    <Collapsible
        iconSize="lg"
        marginBottom="xs"
    >
      <Collapsible.Main {...props}>
        <div>{'Large Section'}</div>
      </Collapsible.Main>
      <Collapsible.Content>
        <div>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat sed purus hendrerit viverra. Duis et vestibulum metus. Sed consequat ut ante non vehicula. Etiam nunc massa, pharetra vel quam id, posuere rhoncus quam. Quisque imperdiet arcu enim, nec aliquet justo auctor eget. Curabitur in metus nec nunc rhoncus faucibus vitae ac elit. Nulla facilisi. Vestibulum quis pretium nulla. Nulla ut accumsan velit. Duis varius urna sed sem tempor, sit amet fermentum nibh auctor. Praesent lorem arcu, egestas non ante quis, placerat pellentesque lectus.Vestibulum lacinia ipsum quis venenatis tristique. Vivamus suscipit, libero eu fringilla egestas, orci urna commodo arcu, vel gravida turpis ipsum molestie nibh. Donec cursus eu ante sagittis ultrices. Phasellus id sagittis risus. Mauris dapibus neque faucibus, tempor ligula vel, cursus ante. Donec faucibus gravida porta. Nullam egestas est quis aliquam feugiat. Sed eget metus diam. Cras eget placerat libero.'
          }
        </div>
      </Collapsible.Content>
    </Collapsible>
  </div>
)

export default CollapsibleSize