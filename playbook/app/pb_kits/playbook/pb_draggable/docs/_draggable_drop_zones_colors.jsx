import React, { useState } from "react";
import { Flex, Image, Caption, Draggable, DraggableProvider } from "playbook-ui";

// Initial items to be dragged
const dataPrimary = [
  {
    id: "81",
    url: "https://unsplash.it/500/400/?image=633",
  },
  {
    id: "82",
    url: "https://unsplash.it/500/400/?image=634",
  },
  {
    id: "83",
    url: "https://unsplash.it/500/400/?image=637",
  },
];
const dataPurple = [
  {
    id: "91",
    url: "https://unsplash.it/500/400/?image=633",
  },
  {
    id: "92",
    url: "https://unsplash.it/500/400/?image=634",
  },
  {
    id: "93",
    url: "https://unsplash.it/500/400/?image=637",
  },
];

const DraggableDropZonesColors = (props) => {
  const [initialPrimaryState, setInitialPrimaryState] = useState(dataPrimary);
  const [initialPurpleState, setInitialPurpleState] = useState(dataPurple);

  return (
    <>
    <Caption marginBottom="xs">
      Primary
    </Caption>
    <DraggableProvider
        dropZone="shadow"
        dropZoneColor="primary"
        initialItems={dataPrimary}
        onReorder={(items) => setInitialPrimaryState(items)}
    >
        <Draggable.Container {...props}>
        <Flex>
            {initialPrimaryState.map(({ id, url }) => (
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
    <Caption marginBottom="xs">
      Purple
    </Caption>
    <DraggableProvider
        dropZone="line"
        dropZoneColor="purple"
        initialItems={dataPurple}
        onReorder={(items) => setInitialPurpleState(items)}
    >
        <Draggable.Container {...props}>
        <Flex>
            {initialPurpleState.map(({ id, url }) => (
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
    </>
  );
};

export default DraggableDropZonesColors;
