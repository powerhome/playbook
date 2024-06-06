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
    id: "1",
    text: "Joe Black",
  },
  {
    id: "2",
    text: "Nancy White",
  },
  {
    id: "3",
    text: "Bill Green",
  },
];

const DraggableWithCards = (props) => {
  const [initialState, setInitialState] = useState(data);

  return (
    <DraggableProvider
        initialItems={data}
        onChange={(items) => setInitialState(items)}
    >
        <Draggable.Container  {...props}>
          {initialState.map(({ id, text }) => (
            <Draggable.Item id={id} 
                key={id}
			>
              <Card
                  highlight={{ position: "side", color: "primary" }}
                  marginBottom="xs"
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

                  <Flex 
                      gap="sm" 
                      spacing="between"
                  >
                    <Caption 
                        size="xs" 
                        text="8:00A" 
					/>
                    <Flex gap="xxs">
                      <Caption 
                          size="xs" 
                          text="Township Name" 
                      />
                      <Caption size="xs" 
                          text="•" 
                      />
                      <Caption size="xs" 
                          text="90210" 
                      />
                    </Flex>
                  </Flex>

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
            </Draggable.Item>
          ))}
        </Draggable.Container>
    </DraggableProvider>
  );
};

export default DraggableWithCards;
