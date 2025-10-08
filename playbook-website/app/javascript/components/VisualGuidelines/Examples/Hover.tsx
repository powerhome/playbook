import React from 'react'
import {
  Background,
  Body,
  Button,
  Caption,
  Card,
  Flex,
  FlexItem,
  Icon,
  Pill,
  SectionSeparator,
  Table,
  Title,
} from 'playbook-ui'

import Example from '../Templates/Example'

const shadowArr = ['deep', 'deeper', 'deepest']
const scaleObj = { 'sm': '@1.05', 'md': '@1.10', 'lg': '@1.15' }
const bool = ['true', 'false']

const Hover = ({ example }: { example: string }) => (
  <React.Fragment>
    <Background
      className="token-wrapper"
      paddingRight="xl"
      paddingLeft="xl"
      paddingTop="xl"
    >
      <Title
        marginBottom="sm"
        size={1}
        tag="h1"
        text="Hover"
      />
      <Body
        paddingBottom="xxs"
        text="Adding our hover prop is useful for easily customizing UI for kit interactions."
      />
      <Button
        link="https://codesandbox.io/s/playbook-global-hover-prop-example-forked-mhssmm?file=/src/App.js"
        newWindow
        padding="none"
        tabIndex={0}
        variant="link"
      >
        <Body
          variant="link"
        >
          {'See this prop in action in our sample UI'}
          <Icon
            fixedWidth
            icon="angle-right"
          />
        </Body>
      </Button>
      <Title
        marginBottom="xs"
        marginTop="md"
        size={4}
        tag="h4"
        text="Global Props"
      />
      <Body
        marginBottom="md"
        text="Available in every kit. These are added globally as they are most flexible when developing."
      />
    </Background>
    <Example
      customChildren
      example={example}
    >
      <Flex
        paddingBottom="sm"
        vertical="stretch"
      >
        <Card.Body
          marginRight="xl"
          paddingRight="xl"
        >
          <Caption
            marginBottom="sm"
            text="Props"
          />
          <Pill
            text="hover"
            textTransform="none"
          />
        </Card.Body>
        <SectionSeparator
          marginBottom="xs"
          marginLeft="xl"
          marginTop="md"
          orientation="vertical"
          paddingLeft="xl"
          variant="card"
        />
        <Table
          container={false}
          dataTable
          marginTop="sm"
          marginX="sm"
          size="sm"
        >
          <thead>
            <tr>
              <th>{'options'}</th>
              <th>{'values'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Pill
                  text="color"
                  textTransform="none"
                  variant="warning"
                />
              </td>
              <td>
                <Pill
                  text="${color}"
                  textTransform="none"
                  variant="warning"
                />
              </td>
            </tr>
            <tr>
              <td>
                <Pill
                  text="background"
                  textTransform="none"
                  variant="warning"
                />
              </td>
              <td>
                <Pill
                  text="${color}"
                  textTransform="none"
                  variant="warning"
                />
              </td>
            </tr>
            <tr>
              <td>
                <Pill
                  text="shadow"
                  textTransform="none"
                  variant="warning"
                />
              </td>
              <td>
                {shadowArr.map((value) => {
                  return (
                    <Pill
                      key={value}
                      text={value}
                      textTransform="none"
                      variant="warning"
                    />
                  )
                })}
              </td>
            </tr>
            <tr>
              <td>
                <Pill
                  text="scale"
                  textTransform="none"
                  variant="warning"
                />
              </td>
              <td>
                {Object.entries(scaleObj).map(([key]) => {
                  return (
                    <Pill
                      key={key}
                      text={key}
                      textTransform="none"
                      variant="warning"
                    />
                  )
                })}
              </td>
            </tr>
            <tr>
              <td>
                <Pill
                  text="visible"
                  textTransform="none"
                  variant="warning"
                />
              </td>
              <td>
                {bool.map((value) => {
                  return (
                    <Pill
                      key={value}
                      text={value}
                      textTransform="none"
                      variant="warning"
                    />
                  )
                })}
              </td>
            </tr>
            <tr>
              <td>
                <Pill
                  text="underline"
                  textTransform="none"
                  variant="warning"
                />
              </td>
              <td>
                {bool.map((value) => {
                  return (
                    <Pill
                      key={value}
                      text={value}
                      textTransform="none"
                      variant="warning"
                    />
                  )
                })}
              </td>
            </tr>
          </tbody>
        </Table>
      </Flex>
    </Example>
    <Background
      className="token-wrapper"
      padding="xl"
    >
      <Card
        marginTop="md"
        shadow="deep"
      >
        <Flex
          orientation="column"
          wrap
          maxWidth="xl"
        >
          <FlexItem paddingBottom="xs">
            <Caption
              text="Visual Guide"
            />
          </FlexItem>
          <FlexItem>
            <Body
              text="Hover over any card below to view hover property."
            />
          </FlexItem>
          <FlexItem paddingY="sm">
            <Flex
              gap="sm"
              wrap
            >
              <Card padding="xs" >
                <Body
                  text="Underline"
                  hover={{ underline: true }}
                />
              </Card>
              <Card padding="xs" >
                <Body
                  text="Text Color"
                  hover={{ color: 'data_1' }}
                />
              </Card>
              <Card
                hover={{ background: 'success_subtle' }}
                padding="xs"
              >
                <Body
                  text="background color*"
                />
              </Card>
              {shadowArr.map((value) => {
                return (
                  <Card
                    hover={{ shadow: value }}
                    key={value}
                    padding="xs"
                  >
                    <Body
                      text={`shadow ${value}`}
                    />
                  </Card>
                )
              })}
              {Object.entries(scaleObj).map(([key, value]) => {
                return (
                  <Card
                    hover={{ scale: key }}
                    key={key}
                    padding="xs"
                  >
                    <Flex align="center">
                      <Body
                        paddingRight="xxs"
                        text={`scale ${key}`}
                      />
                      <Caption
                        size="xs"
                        text={value}
                      />
                    </Flex>
                  </Card>
                )
              })}
            </Flex>
          </FlexItem>
          <FlexItem>
            <Caption
              size="xs"
              text="*background accepts any color token"
            />
          </FlexItem>
        </Flex>
      </Card>
    </Background>
  </React.Fragment>
)

export default Hover
