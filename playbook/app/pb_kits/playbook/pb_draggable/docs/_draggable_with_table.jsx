import React, { useState } from "react";
import { Flex, Table, Body, Avatar, DraggableProvider } from "playbook-ui";

// Initial items to be dragged
const data = [
    {
        id: "1",
        task: "Task 1",
        assignee_name: "Terry Miles",
        assignee_img: "https://randomuser.me/api/portraits/men/44.jpg",
      },
      {
        id: "2",
        task: "Task 2",
        assignee_name: "Sophia Miles",
        assignee_img: "https://randomuser.me/api/portraits/women/8.jpg",
      },
      {
        id: "3",
        task: "Task 3",
        assignee_name: "Alice Jones",
        assignee_img: "https://randomuser.me/api/portraits/women/10.jpg",
      },
      {
        id: "4",
        task: "Task 4",
        assignee_name: "Mike James",
        assignee_img: "https://randomuser.me/api/portraits/men/8.jpg",
      },
      {
        id: "5",
        task: "Task 5",
        assignee_name: "James Guy",
        assignee_img: "https://randomuser.me/api/portraits/men/18.jpg",
      }
];

const DraggableWithTable = (props) => {
  const [initialState, setInitialState] = useState(data);

  return (
    <>
    <DraggableProvider initialItems={data}
        onReorder={(items) => setInitialState(items)}
    >
        <Table
            responsive="none"
            size="sm" 
            {...props}
        >
          <Table.Head>
            <Table.Row>
              <Table.Header>{"id"}</Table.Header>
              <Table.Header>{"name"}</Table.Header>
              <Table.Header>{"task number"}</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body draggableContainer>
            {initialState.map(({ id, task, assignee_name, assignee_img }) => (
              <Table.Row 
                  dragId={id} 
                  draggableItem
                  key={id}
              >
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>
                  <Flex align="center">
                    <Avatar 
                        imageUrl={assignee_img} 
                        size="xs" 
                    />
                    <Body 
                        paddingLeft="xxs" 
                        text={assignee_name} 
                    />
                  </Flex>
                </Table.Cell>
                <Table.Cell>{task}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
    </DraggableProvider>
    </>

  );
};

export default DraggableWithTable;
