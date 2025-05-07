import React, { useState } from "react";

import Flex from '../../pb_flex/_flex'
import Image from '../../pb_image/_image'
import Draggable from '../../pb_draggable/_draggable'
import { DraggableProvider } from '../../pb_draggable/context'

const data = [
  {
    id: "100",
    url: "https://unsplash.it/500/400/?image=638",
  },
  {
    id: "200",
    url: "https://unsplash.it/500/400/?image=639",
  },
  {
    id: "300",
    url: "https://unsplash.it/500/400/?image=640",
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
                  onDrag={() => console.log(`${id} drag!`)}
                  onDragEnd={() => console.log(`${id} drag end!`)}
                  onDragEnter={() => console.log(`${id} drag enter!`)}
                  onDragLeave={() => console.log(`${id} drag leave!`)}
                  onDragOver={() => console.log(`${id} drag over!`)}
                  onDragStart={() => console.log(`${id} drag start!`)}
                  onDrop={() => console.log(`${id} drop!`)}
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
