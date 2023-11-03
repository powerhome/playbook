import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Flex,
  BreadCrumbs,
  BreadCrumbItem,
  Icon,
  Title,
  TextInput,
  Body,
  Card,
  Nav,
  NavItem,
} from "playbook-ui";
import "./styles.scss";

export default function Scaffold(props) {
  console.log('scaffold props', props)
  const { name, type } = useParams();
  const [searchParams] = useSearchParams();
  const queryType = searchParams.get("type");

  const content = [
    {
      title: "Button",
      description:
        "Date pickers let users choose dates from a visual calendar that’s consistently applied where dates need to be selected.",
    },
    {
      title: "Collapsible",
      description:
        "Buttons are used primarily for actions, such as “Add”, “Close”, “Cancel”, or “Save”.",
    },
  ];

  return (
    <Flex marginX="auto" maxWidth="xxl" orientation="column">
      <Flex justify="center" orientation="row">
        <Nav orientation="horizontal" variant="subtle">
          <NavItem iconLeft="atom" link="#" text="React" />
          <NavItem iconLeft="atom" link="#" text="Rails" />
          <NavItem iconLeft="atom" link="#" text="Swift" />
        </Nav>
      </Flex>
      <Flex justify="center" marginY="lg" orientation="row">
        <TextInput />
      </Flex>

      <section className="category mb_xl">
        <Title marginBottom="md" size={2} tag="h2" text={"Actions"} />
        <div className="category-container">
          {content.map(({ title, description }, index) => (
            <Card className="category-card" key={index}>
              <Flex
                align="center"
                className="category-card-header"
                justify="between"
              >
                <Title text={title} />
                <div className="icon">
                  <Icon fixedWidth icon="angle-right" size="2x" />
                </div>
              </Flex>
              <Body className="category-card-description" text={description} />
            </Card>
          ))}
        </div>
      </section>
      <section className="category mb_xl">
        <Title marginBottom="md" size={2} tag="h2" text={"Actions"} />
        <div className="category-container">
          {content.map(({ title, description }, index) => (
            <Card className="category-card" key={index}>
              <Flex
                align="center"
                className="category-card-header"
                justify="between"
              >
                <Title text={title} />
                <div className="icon">
                  <Icon fixedWidth icon="angle-right" size="2x" />
                </div>
              </Flex>
              <Body className="category-card-description" text={description} />
            </Card>
          ))}
          {content.map(({ title, description }, index) => (
            <Card className="category-card" key={index}>
              <Flex
                align="center"
                className="category-card-header"
                justify="between"
              >
                <Title text={title} />
                <div className="icon">
                  <Icon fixedWidth icon="angle-right" size="2x" />
                </div>
              </Flex>
              <Body className="category-card-description" text={description} />
            </Card>
          ))}
        </div>
      </section>
      <section className="category mb_xl">
        <Title marginBottom="md" size={2} tag="h2" text={"Actions"} />
        <div className="category-container">
          {content.map(({ title, description }, index) => (
            <Card className="category-card" key={index}>
              <Flex
                align="center"
                className="category-card-header"
                justify="between"
              >
                <Title text={title} />
                <div className="icon">
                  <Icon fixedWidth icon="angle-right" size="2x" />
                </div>
              </Flex>
              <Body className="category-card-description" text={description} />
            </Card>
          ))}
          {content.map(({ title, description }, index) => (
            <Card className="category-card" key={index}>
              <Flex
                align="center"
                className="category-card-header"
                justify="between"
              >
                <Title text={title} />
                <div className="icon">
                  <Icon fixedWidth icon="angle-right" size="2x" />
                </div>
              </Flex>
              <Body className="category-card-description" text={description} />
            </Card>
          ))}
        </div>
      </section>
    </Flex>
  );
}
