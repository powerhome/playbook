import React from "react";
import { Collapsible } from "../..";
import { Flex, FlexItem, Caption, Body } from "../..";
const CollapsibleMainFlexItem = () => (
<>
  <Collapsible 
      mainFlexItem="1"
  >
    <Collapsible.Main>
      <Flex 
          gap="lg" 
          justify="center"
          wrap
       >
        <FlexItem 
            orientation="column"
        >
          <Caption text="Number" />
          <Body text="12345" />
        </FlexItem>

        <FlexItem 
            orientation="column"
        >
          <Caption text="Title" />
          <Body text="Title" />
        </FlexItem>

        <FlexItem 
            orientation="column"
        >
          <Caption text="Description" />
          <Body text="Description" />
        </FlexItem>
      </Flex>
    </Collapsible.Main>
    <Collapsible.Content>
      <div>
        {
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat sed purus hendrerit viverra. Duis et vestibulum metus. Sed consequat ut ante non vehicula. Etiam nunc massa, pharetra vel quam id, posuere rhoncus quam. Quisque imperdiet arcu enim, nec aliquet justo auctor eget. Curabitur in metus nec nunc rhoncus faucibus vitae ac elit. Nulla facilisi. Vestibulum quis pretium nulla. Nulla ut accumsan velit. Duis varius urna sed sem tempor, sit amet fermentum nibh auctor. Praesent lorem arcu, egestas non ante quis, placerat pellentesque lectus.Vestibulum lacinia ipsum quis venenatis tristique. Vivamus suscipit, libero eu fringilla egestas, orci urna commodo arcu, vel gravida turpis ipsum molestie nibh. Donec cursus eu ante sagittis ultrices. Phasellus id sagittis risus. Mauris dapibus neque faucibus, tempor ligula vel, cursus ante. Donec faucibus gravida porta. Nullam egestas est quis aliquam feugiat. Sed eget metus diam. Cras eget placerat libero."
        }
      </div>
    </Collapsible.Content>
  </Collapsible>
  </>
);

export default CollapsibleMainFlexItem;
