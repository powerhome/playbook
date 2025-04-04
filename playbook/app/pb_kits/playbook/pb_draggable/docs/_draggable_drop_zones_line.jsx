import React, { useState } from "react";
import Flex from '../../pb_flex/_flex'
import Caption from '../../pb_caption/_caption'
import Draggable from '../_draggable'
import { DraggableProvider } from '../context'
import Image from '../../pb_image/_image'



const dataLineVertical = [
  {
    id: "211",
    url: "https://unsplash.it/500/400/?image=633",
  },
  {
    id: "212",
    url: "https://unsplash.it/500/400/?image=634",
  },
  {
    id: "213",
    url: "https://unsplash.it/500/400/?image=637",
  },
];

const dataLineHorizontal = [
  {
    id: "2111",
    url: "https://unsplash.it/500/400/?image=633",
  },
  {
    id: "2122",
    url: "https://unsplash.it/500/400/?image=634",
  },
  {
    id: "2133",
    url: "https://unsplash.it/500/400/?image=637",
  },
];

const DraggableDropZones = (props) => {
  const [initialLineVerticalState, setInitialLineVerticalState] = useState(dataLineVertical);
  const [initialLineHorizontalState, setInitialLineHorizontalState] = useState(dataLineHorizontal);

  return (
    <>
      <Caption marginBottom="xs" 
          marginTop="xl"
          text="Vertical"
      />
      <DraggableProvider
          dropZone={{ type: "line", color: "purple" }}
          initialItems={dataLineVertical}
          onReorder={(items) => setInitialLineVerticalState(items)}
      >
        <Draggable.Container {...props}>
          <Flex flexDirection="column"
              height="367px"
          >
              {initialLineVerticalState.map(({ id, url }) => (
                <Draggable.Item dragId={id}
                    key={id}
                    marginBottom="sm"
                >
                  <Image alt={id}
                      size="md"
                      url={url}
                  />
                </Draggable.Item>
              ))}
          </Flex>
        </Draggable.Container>
      </DraggableProvider>
      <Caption marginBottom="xs" 
          marginTop="xl"
          text="Horizontal"
      />
      <Flex>
        <DraggableProvider
            dropZone={{ type: "line", direction: "horizontal" }}
            initialItems={dataLineHorizontal}
            onReorder={(items) => setInitialLineHorizontalState(items)}
        >
          <Draggable.Container
              htmlOptions={{style:{ width: "285px"}}}
              {...props}
          >
            <Flex alignItems="stretch"
                flexDirection="row"
                height="110px"
            > 
              {initialLineHorizontalState.map(({ id, url }) => (
                <Draggable.Item dragId={id}
                    key={id}
                    marginRight="sm"
                >
                  <Image alt={id}
                      size="md"
                      url={url}
                  />
                </Draggable.Item>
              ))}
            </Flex>
          </Draggable.Container>
        </DraggableProvider>
      </Flex>
    </>
  );
};

export default DraggableDropZones;
