import React, { useState } from "react";

import Flex from '../../pb_flex/_flex'
import Image from '../../pb_image/_image'
import Caption from '../../pb_caption/_caption'
import Draggable from '../../pb_draggable/_draggable'
import { DraggableProvider } from '../../pb_draggable/context'



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
      <Caption marginBottom="xs"
          text="Primary"
      />
      <DraggableProvider
          dropZone={{type: "shadow", color: "primary"}}
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
      <Caption marginBottom="xs"
          text="Purple"
      />
      <DraggableProvider
          dropZone={{type: "outline", color: "purple"}}
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
