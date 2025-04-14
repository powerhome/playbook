import React, { useState } from "react";
import Body from '../../pb_body/_body'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import Card from '../../pb_card/_card'
import Caption from '../../pb_caption/_caption'
import Draggable from '../../pb_draggable/_draggable'
import { DraggableProvider } from '../../pb_draggable/context'

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
          {...props}
      >
        <FlexItem marginRight="xl">
          <DraggableProvider
              dropZone={{type: "shadow"}}
              initialItems={dataShadow}
              onReorder={(items) => setInitialShadowState(items)}
          >
              <Caption
                  marginBottom="xs"
                  text="Shadow"
                  textAlign="center"
              />
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
        <FlexItem marginRight="xl">
          <DraggableProvider
              dropZone={{type: "outline"}}
              initialItems={dataOutline}
              onReorder={(items) => setInitialOutlineState(items)}
          >
              <Caption
                  marginBottom="xs"
                  text="Outline"
                  textAlign="center"
              />
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
              dropZone={{type: "line"}}
              initialItems={dataLine}
              onReorder={(items) => setInitialLineState(items)}
          >
              <Caption
                  marginBottom="xs"
                  text="Line"
                  textAlign="center"
              />
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
