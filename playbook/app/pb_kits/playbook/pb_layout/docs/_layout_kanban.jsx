import React from 'react'
import {
  Avatar,
  Caption,
  Card,
  Flex,
  FlexItem,
  Icon,
  Layout,
  MultipleUsers,
  Timestamp,
  Title,
} from '../../'

const LayoutKanban = () => {
  return (
    <div>
      <Layout layout="kanban">
        <Layout.Body>
          <Caption>{'Queue'}</Caption>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Design Homepage'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                    name="Michelle Smith"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Change Old App Icon'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
        </Layout.Body>
        <Layout.Body>
          <Caption>{'In Progress'}</Caption>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Dashboard Updates'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1509868918748-a554ad25f858?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=3159ec467959b2aada4b75d565c270aa"
                    name="Michelle Smith"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Usability Testing'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <MultipleUsers
                    paddingLeft="xs"
                    users={[
                    {
                      name: 'Shawn Palmer',
                      imageUrl:
                        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=74daec1914d1d105202bca8a310a6a71',
                    },
                    {
                      name: 'Andrew Murray Cooper Craig',
                      imageUrl:
                        'https://images.unsplash.com/photo-1513732822839-24f03a92f633?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
                    },
                  ]}
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'New Icons'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
        </Layout.Body>
        <Layout.Body>
          <Caption>{'Validation'}</Caption>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Build Full Page Example'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                    name="Michelle Smith"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Design System Documentation'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Prop Bug'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Discovery Session'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                    name="Michelle Smith"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Design Exploration'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1513732822839-24f03a92f633?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Fix Sketch Bugs'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Test Out Figma'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                    name="Michelle Smith"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Ship New Feature'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Meet with Client'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>

          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Re-engineer Old Modal'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                    name="Michelle Smith"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Setup Permissions'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Build Prototype'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Collaborate with Team'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                    name="Michelle Smith"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Interview Candidates'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Run Testing Suite'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Live Coding Session'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
                    name="Michelle Smith"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'All Hands Meeting'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Growth Engineering Meeting'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
        </Layout.Body>
        <Layout.Body>
          <Caption>{'Done'}</Caption>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Re-rendering Bug'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Gather Resources'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
        </Layout.Body>
        <Layout.Body>
          <Caption>{'Another Column'}</Caption>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'All Hands Meeting'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1544817747-b11e3e3b6ac2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Growth Engineering Meeting'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
        </Layout.Body>
        <Layout.Body>
          <Caption>{'Another Column'}</Caption>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'All Hands Meeting'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=73a9df4b7bd1b330db1e903e08575ec1"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Pairing'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
        </Layout.Body>
        <Layout.Body>
          <Caption>{'Another Column'}</Caption>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'Design Session'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
          <Card
              padding="sm"
              shadow="deep"
          >
            <Flex
                orientation="row"
                spacing="between"
            >
              <FlexItem>
                <Title size="4">{'UX Engineering Meeting'}</Title>
              </FlexItem>
              <FlexItem>
                <Icon icon="ellipsis-h" />
              </FlexItem>
            </Flex>
            <Flex
                orientation="row"
                spacing="between"
                vertical="bottom"
            >
              <FlexItem marginTop="xs">
                <Avatar
                    imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    name="Roger Donahue"
                    size="sm"
                />
              </FlexItem>
              <FlexItem>
                <Flex
                    orientation="row"
                    vertical="center"
                >
                  <Icon icon="clock" />
                  <Timestamp text="00:00:00 h" />
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
        </Layout.Body>
      </Layout>
    </div>
  )
}

export default LayoutKanban
