import React, { useState } from "react";
import { Body, Flex, FlexItem, Card, Caption, Draggable, DraggableProvider } from "playbook-ui";

// Initial items to be dragged
const dataShadow = [
  {
    id: "51",
    text: "Task 1",
  },
  {
    id: "52",
    text: "Task 2",
  },
  {
    id: "53",
    text: "Task 3",
  },
];

const dataOutline = [
  {
    id: "61",
    text: "Task 1",
  },
  {
    id: "62",
    text: "Task 2",
  },
  {
    id: "63",
    text: "Task 3",
  },
];

const dataLine = [
  {
    id: "71",
    text: "Task 1",
  },
  {
    id: "72",
    text: "Task 2",
  },
  {
    id: "73",
    text: "Task 3",
  },
];

const DraggableDropZones = (props) => {
  const [initialShadowState, setInitialShadowState] = useState(dataShadow);
  const [initialOutlineState, setInitialOutlineState] = useState(dataOutline);
  const [initialLineState, setInitialLineState] = useState(dataLine);

  return (
    <>
    <Flex justify="between"
        justifyContent="center"
        {...props}
    >
      <FlexItem marginRight="lg">
        <DraggableProvider
            dropZone="shadow"
            dropZoneDirection="vertical"
            initialItems={dataShadow}
            onReorder={(items) => setInitialShadowState(items)}
        >
            <Caption
                marginBottom="xs"
                textAlign="center"
            >
              {"Shadow"}
            </Caption>
            <Draggable.Container
                htmlOptions={{style:{ width: "200px"}}}
                {...props}
            >
            {initialShadowState.map(({ id, text }) => (
              <Card dragId={id}
                  draggableItem
                  key={id}
                  marginBottom="xs"
                  padding="xs"
                  {...props}
              >
                <Flex alignItems="stretch"
                    flexDirection="column"
                >
                  <Body
                      text={text}
                      {...props}
                  />
                </Flex>
              </Card>
            ))}
            </Draggable.Container>
        </DraggableProvider>
      </FlexItem>
      <FlexItem marginRight="lg">
        <DraggableProvider
            dropZone="outline"
            dropZoneDirection="vertical"
            initialItems={dataOutline}
            onReorder={(items) => setInitialOutlineState(items)}
        >
            <Caption
                marginBottom="xs"
                textAlign="center"
            >
              {"Outline"}
            </Caption>
            <Draggable.Container
                htmlOptions={{style:{ width: "200px"}}}
                {...props}
            >
            {initialOutlineState.map(({ id, text }) => (
              <Card
                  dragId={id}
                  draggableItem
                  key={id}
                  marginBottom="xs"
                  padding="xs"
                  {...props}
              >
                <Flex
                    alignItems="stretch"
                    flexDirection="column"
                >
                  <Body
                      text={text}
                      {...props}
                  />
                </Flex>
              </Card>
            ))}
            </Draggable.Container>
        </DraggableProvider>
      </FlexItem>
      <FlexItem>
        <DraggableProvider
            dropZone="line"
            dropZoneDirection="vertical"
            initialItems={dataLine}
            onReorder={(items) => setInitialLineState(items)}
        >
            <Caption
                marginBottom="xs"
                textAlign="center"
            >
              {"Line"}
            </Caption>
            <Draggable.Container
                htmlOptions={{style:{ width: "200px"}}}
                {...props}
            >
            {initialLineState.map(({ id, text }) => (
              <Card dragId={id}
                  draggableItem
                  key={id}
                  marginBottom="xs"
                  padding="xs"
                  {...props}
              >
                <Flex alignItems="stretch"
                    flexDirection="column"
                >
                  <Body
                      text={text}
                      {...props}
                  />
                </Flex>
              </Card>
            ))}
            </Draggable.Container>
        </DraggableProvider>
      </FlexItem>
    </Flex>
    </>
  );
};

export default DraggableDropZones;
