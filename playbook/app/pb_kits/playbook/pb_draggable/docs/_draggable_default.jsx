import React, { useState } from "react";

import Flex from '../../pb_flex/_flex'
import Draggable from '../../pb_draggable/_draggable'
import { DraggableProvider } from '../../pb_draggable/context'


// Initial items to be dragged
const data = [
  {
    id: "21",
    url: "https://unsplash.it/500/400/?image=633",
  },
  {
    id: "22",
    url: "https://unsplash.it/500/400/?image=634",
  },
  {
    id: "23",
    url: "https://unsplash.it/500/400/?image=637",
  },
];

const DraggableDefault = (props) => {
  const [initialState, setInitialState] = useState(data);

  return (
    <>
    <DraggableProvider initialItems={data}
        onReorder={(items) => setInitialState(items)}
    >
        <Draggable.Container {...props}>
        <Flex>
            {initialState.map(({ id, url }) => (
              <Draggable.Item dragId={id} 
                  key={id}
              >
                <Image alt={id} 
                    margin="xs"
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

export default DraggableDefault;
