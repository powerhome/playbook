import React from 'react'
import Collapsible from "../../pb_collapsible/_collapsible"

const CollapsibleIcons = (props) => {

  return (
  <>
  <Collapsible
      icon={['plus','minus']}
  >
    <Collapsible.Main {...props}>
      <div>{'Main Section'}</div>
    </Collapsible.Main>
    <Collapsible.Content>
      <div>
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat sed purus hendrerit viverra. Duis et vestibulum metus. Sed consequat ut ante non vehicula. Etiam nunc massa, pharetra vel quam id, posuere rhoncus quam. Quisque imperdiet arcu enim, nec aliquet justo auctor eget. Curabitur in metus nec nunc rhoncus faucibus vitae ac elit. Nulla facilisi. Vestibulum quis pretium nulla. Nulla ut accumsan velit. Duis varius urna sed sem tempor, sit amet fermentum nibh auctor. Praesent lorem arcu, egestas non ante quis, placerat pellentesque lectus.Vestibulum lacinia ipsum quis venenatis tristique. Vivamus suscipit, libero eu fringilla egestas, orci urna commodo arcu, vel gravida turpis ipsum molestie nibh. Donec cursus eu ante sagittis ultrices. Phasellus id sagittis risus. Mauris dapibus neque faucibus, tempor ligula vel, cursus ante. Donec faucibus gravida porta. Nullam egestas est quis aliquam feugiat. Sed eget metus diam. Cras eget placerat libero.'
        }
      </div>
    </Collapsible.Content>
  </Collapsible>
  </>
  )
}

export default CollapsibleIcons