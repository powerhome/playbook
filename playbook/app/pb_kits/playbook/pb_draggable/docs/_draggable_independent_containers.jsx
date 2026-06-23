import React, { useState } from "react";

import Body from "../../pb_body/_body";
import Caption from "../../pb_caption/_caption";
import Draggable from "../../pb_draggable/_draggable";
import { DraggableProvider } from "../../pb_draggable/context";
import Flex from "../../pb_flex/_flex";
import FlexItem from "../../pb_flex/_flex_item";

const lists = [
  {
    title: "Morning Crew",
    items: [
      { id: "m1", name: "Alice Chen" },
      { id: "m2", name: "Ben Ortiz" },
      { id: "m3", name: "Cara Kim" },
    ],
  },
  {
    title: "Afternoon Crew",
    items: [
      { id: "a1", name: "Diana Patel" },
      { id: "a2", name: "Evan Brooks" },
      { id: "a3", name: "Fiona Lee" },
    ],
  },
];

const initialListItems = lists.reduce((acc, list) => {
  acc[list.title] = list.items;
  return acc;
}, {});

const DraggableIndependentContainers = (props) => {
  const [listItems, setListItems] = useState(initialListItems);

  const handleReorder = (title, items) => {
    setListItems((currentItems) => ({ ...currentItems, [title]: items }));
  };

  return (
    <Flex gap="md"
        justifyContent="center"
        wrap
        {...props}
    >
      {lists.map((list) => (
        <FlexItem fixedSize="220px"
            key={list.title}
        >
          <Caption marginBottom="xs"
              text={list.title}
              textAlign="center"
              {...props}
          />
          <DraggableProvider
              initialItems={listItems[list.title]}
              onReorder={(items) => handleReorder(list.title, items)}
          >
            <Draggable.Container padding="sm"
                {...props}
            >
              {listItems[list.title].map(({ id, name }) => (
                <Draggable.Item dragId={id}
                    key={id}
                    marginBottom="xs"
                >
                  <Body text={name}
                      {...props}
                  />
                </Draggable.Item>
              ))}
            </Draggable.Container>
          </DraggableProvider>
        </FlexItem>
      ))}
    </Flex>
  );
};

export default DraggableIndependentContainers;
