import React, { useState } from "react";
import {
  Flex,
  Badge,
  Title,
  Icon,
  Draggable,
  DraggableProvider,
  Card,
  Caption,
} from "../../";

// Initial items to be dragged
const data = [
  {
    id: "21",
    text: "Joe Black",
  },
  {
    id: "22",
    text: "Nancy White",
  },
  {
    id: "23",
    text: "Bill Green",
  },
];

const DraggableWithCards = (props) => {
  const [initialState, setInitialState] = useState(data);

  return (
    <DraggableProvider
        initialItems={data}
        onReorder={(items) => setInitialState(items)}
    >
        <Draggable.Container  {...props}>
          {initialState.map(({ id, text }) => (
              <Card
                  draggableItem
                  highlight={{ color: "primary", position: "side" }}
                  id={id}
                  key={id}
                  marginBottom="xs"
                  padding="xs"
              >
                <Flex alignItems="stretch" 
                    flexDirection="column"
                >
                  <Flex gap="xs">
                    <Title size={4} 
                        text={text} 
                    />
                    <Badge 
                        text="35-12345" 
                        variant="primary" 
                    />
                  </Flex>
                      <Caption 
                          size="xs" 
                          text="8:00A • Township Name • 90210" 
                      />
                  <Flex gap="xxs" 
                      spacing="between"
                  >
                    <Flex gap="xxs">
                      <Caption color="error" 
                          size="xs"
                      >
                        <Icon icon="house-circle-exclamation" />
                      </Caption>
                      <Caption color="success" 
                          size="xs">
                        <Icon icon="file-circle-check" />
                      </Caption>
                    </Flex>
                    <Flex>
                      <Badge rounded 
                          text="Schedule QA" 
                          variant="warning" 
                       />
                      <Badge rounded 
                          text="Flex" 
                          variant="primary" 
                      />
                      <Badge rounded 
                          text="R99" 
                          variant="primary" 
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
          ))}
        </Draggable.Container>
    </DraggableProvider>
  );
};

export default DraggableWithCards;
