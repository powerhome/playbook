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
              <Card dragId={id}
                  draggableItem
                  highlight={{ color: "primary", position: "side" }}
                  key={id}
                  marginBottom="xs"
                  padding="xs"
                  {...props}
              >
                <Flex alignItems="stretch" 
                    flexDirection="column"
                >
                  <Flex gap="xs">
                    <Title size={4} 
                        text={text}
                        {...props} 
                    />
                    <Badge 
                        text="35-12345" 
                        variant="primary" 
                        {...props}
                    />
                  </Flex>
                      <Caption 
                          size="xs" 
                          text="8:00A • Township Name • 90210" 
                          {...props}
                      />
                  <Flex gap="xxs" 
                      spacing="between"
                  >
                    <Flex gap="xxs">
                      <Caption color="error" 
                          size="xs"
                          {...props}
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
                          {...props}
                       />
                      <Badge rounded 
                          text="Flex" 
                          variant="primary"
                          {...props} 
                      />
                      <Badge rounded 
                          text="R99" 
                          variant="primary" 
                          {...props}
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
