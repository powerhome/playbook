import React, { useState } from "react";

import Flex from '../../pb_flex/_flex'
import Draggable from '../../pb_draggable/_draggable'
import { DraggableProvider } from '../../pb_draggable/context'
import Badge from '../../pb_badge/_badge'
import Title from '../../pb_title/_title'
import Caption from '../../pb_caption/_caption'
import Card from '../../pb_card/_card'
import FlexItem from '../../pb_flex/_flex_item'
import Avatar from '../../pb_avatar/_avatar'
import Body from '../../pb_body/_body'

// Initial groups to drag between
const containers = ["To Do", "In Progress", "Done"];

// Initial items to be dragged
const data = [
  {
    id: "11",
    container: "To Do",
    title: "Task 1",
    description: "Bug fixes",
    assignee_name: "Terry Miles",
    assignee_img: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: "12",
    container: "To Do",
    title: "Task 2",
    description: "Documentation",
    assignee_name: "Sophia Miles",
    assignee_img: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "13",
    container: "In Progress",
    title: "Task 3",
    description: "Add a variant",
    assignee_name: "Alice Jones",
    assignee_img: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    id: "14",
    container: "To Do",
    title: "Task 4",
    description: "Add jest tests",
    assignee_name: "Mike James",
    assignee_img: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    id: "15",
    container: "Done",
    title: "Task 5",
    description: "Alpha testing",
    assignee_name: "James Guy",
    assignee_img: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    id: "16",
    container: "In Progress",
    title: "Task 6",
    description: "Release",
    assignee_name: "Sally Jones",
    assignee_img: "https://randomuser.me/api/portraits/women/28.jpg",
  },
];

const DraggableMultipleContainersDropzone = (props) => {
  const [initialState, setInitialState] = useState(data);

  const badgeProperties = (container) => {
    switch (container) {
      case "To Do":
        return { text: "queue", color: "warning" };
      case "In Progress":
        return { text: "progress", color: "primary" };
      default:
        return { text: "done", color: "success" };
    }
  };

  return (
    <DraggableProvider 
        dropZone={{type: "outline"}}
        initialItems={data}
        onDragEnd={(draggedItemId, finalContainer, originalContainer, itemAbove, itemBelow) => {
          console.log(`Dragged Item ID: ${draggedItemId}`);
          console.log(`Final Container: ${finalContainer}`);
          console.log(`Original Container: ${originalContainer}`);
          console.log('Item Above:', itemAbove);
          console.log('Item Below:', itemBelow);
        }}
        onDrop={(draggedItemId, droppedContainer, originalContainer, item, itemAbove, itemBelow) => {
          console.log(`Dragged Item ID: ${draggedItemId}`);
          console.log(`Dropped Container: ${droppedContainer}`);
          console.log(`Original Container: ${originalContainer}`);
          console.log('Dropped Item:', item);
          console.log('Item Above:', itemAbove);
          console.log('Item Below:', itemBelow);
        }}
        onReorder={(items) => setInitialState(items)}
    >
      <Flex
          justifyContent="center"
          {...props}
      >
          {containers?.map((container) => (
            <Draggable.Container 
                container={container}
                htmlOptions={{style:{ width: "200px", height: "70vh"}}}
                key={container} 
                padding="sm"
            >
                <Caption textAlign="center">{container}</Caption>
                <Flex 
                    alignItems="stretch"
                    gap="sm"
                    orientation="column" 
                >
                  {initialState
                    .filter((item) => item.container === container)
                    .map(
                      ({
                        assignee_img,
                        assignee_name,
                        description,
                        id,
                        title,
                      }) => (
                        <Draggable.Item 
                            container={container}
                            dragId={id} 
                            key={id}
                        >
                          <Card
                              padding="sm"
                              {...props}
                          >
                            <Flex justify="between">
                              <FlexItem>
                                <Flex>
                                  <Avatar
                                      imageUrl={assignee_img}
                                      name={assignee_name}
                                      size="xxs"
                                  />
                                  <Title paddingLeft="xs" 
                                      size={4}
                                      text={title}
                                      {...props}
                                  />
                                </Flex>
                              </FlexItem>
                              <Badge
                                  marginLeft="sm"
                                  rounded
                                  text={badgeProperties(container).text}
                                  variant={badgeProperties(container).color}
                                  {...props}
                              />
                            </Flex>
                            <Body paddingTop="xs"
                                text={description} 
                                {...props}
                            />
                          </Card>
                        </Draggable.Item>
                      )
                    )}
                </Flex>
            </Draggable.Container>
          ))}
      </Flex>
    </DraggableProvider>
  );
};

export default DraggableMultipleContainersDropzone;
