import React, { useState } from "react";
import {
  Flex,
  Caption,
  Card,
  FlexItem,
  Badge,
  Avatar,
  Title,
  Body,
  Draggable,
  DraggableProvider,
} from "../../";

// Initial groups to drag between
const containers = ["To Do", "In Progress", "Done"];

// Initial items to be dragged
const data = [
  {
    id: "1",
    container: "To Do",
    title: "Task 1",
    description: "Bug fixes",
    assignee_name: "Terry Miles",
    assignee_img: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: "2",
    container: "To Do",
    title: "Task 2",
    description: "Documentation",
    assignee_name: "Sophia Miles",
    assignee_img: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "3",
    container: "In Progress",
    title: "Task 3",
    description: "Add a variant",
    assignee_name: "Alice Jones",
    assignee_img: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    id: "4",
    container: "To Do",
    title: "Task 4",
    description: "Add jest tests",
    assignee_name: "Mike James",
    assignee_img: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    id: "5",
    container: "Done",
    title: "Task 5",
    description: "Alpha testing",
    assignee_name: "James Guy",
    assignee_img: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    id: "6",
    container: "In Progress",
    title: "Task 6",
    description: "Release",
    assignee_name: "Sally Jones",
    assignee_img: "https://randomuser.me/api/portraits/women/28.jpg",
  },
];

const DraggableMultipleContainer = (props) => {
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
    <DraggableProvider initialItems={data}
        onChange={(items) => setInitialState(items)}
    >
      <Draggable
          display="flex"
          justifyContent="center"
          {...props}
      >
          {containers?.map((container) => (
            <Draggable.Container 
                container={container}
                key={container} 
                padding="sm"
            >
                <Caption textAlign="center">{container}</Caption>
                <Flex 
                    alignItems="stretch"
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
                            id={id} 
                            key={id}
                        >
                          <Card
                              marginBottom="sm"
                              padding="sm"
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
                                  />
                                </Flex>
                              </FlexItem>
                              <Badge
                                  marginLeft="sm"
                                  rounded
                                  text={badgeProperties(container).text}
                                  variant={badgeProperties(container).color}
                              />
                            </Flex>
                            <Body paddingTop="xs"
                                text={description} 
                            />
                          </Card>
                        </Draggable.Item>
                      )
                    )}
                </Flex>
            </Draggable.Container>
          ))}
      </Draggable>
    </DraggableProvider>
  );
};

export default DraggableMultipleContainer;
