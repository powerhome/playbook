import React from "react";
import { Title, Body, Flex, FlexItem, Image, Button } from "playbook-ui";
import { Logos } from "../ComponentData/LogosData";
// @ts-ignore
import Underline from "../../../images/PurpleUnderline.svg";

type WelcomeProps = {
  fixedSize?: string;
  headerAlign?: string;
  buttonsAlignment?: string;
  displayProps?: any;
  titleSize?: number | string;
  buttonsFlexDirection?: string;
  buttonFullWidth?: string | boolean;
};

const WelcomeComponent = ({
  fixedSize,
  headerAlign,
  buttonsAlignment,
  displayProps,
  titleSize,
  buttonsFlexDirection = "row",
  buttonFullWidth
}: WelcomeProps) => {
  return (
    <>
      <Flex
        className="welcome_component"
        width="md"
      >
        <FlexItem
          fixedSize={fixedSize}
          textAlign={headerAlign}
          {...displayProps}
        >
          <Title
            text="WELCOME TO PLAYBOOK"
            size={4}
            color="link"
            paddingBottom="xs"
          />
          <Title
            size={titleSize ? titleSize : 1}
            paddingBottom="sm"
            position="relative"
          >
            {" "}
            The Design System to help you{" "}
            <span>
              ship faster.
              <Image
                position="absolute"
                className="welcome_component_underline"
                url={Underline}
              />
            </span>
          </Title>
          <Body
            className="welcome_component_text"
            color="light"
            text="Playbook makes it easy to support bleeding edge, or legacy systems. Use Playbook’s 200+ components and end-to-end design language to create simple, intuitive and beautiful experiences with ease."
          />
          <Flex paddingY="lg" justifyContent={buttonsAlignment}>
            {Logos.map(({ text, logo }, i) => (
              <React.Fragment key={`flex-${i}`}>
                <Flex align="center" paddingRight="sm">
                  <Image url={logo} />
                  <Body paddingLeft="xxs" text={text} color="light" />
                </Flex>
              </React.Fragment>
            ))}
          </Flex>
          <Flex className="welcome_component_buttons" justifyContent={buttonsAlignment} orientation={buttonsFlexDirection}>
            <Button
              fullWidth={buttonFullWidth && true}
              icon="arrow-right"
              iconRight
              link="/guides/getting_started"
              marginBottom="sm"
              marginRight="sm"
              tabIndex={0}
              text="Get started"
              zIndex={2}
            />
            <Button
              fullWidth={buttonFullWidth}
              link="/kits"
              tabIndex={0}
              text="Explore components"
              variant="secondary"
              zIndex={2}
            />
          </Flex>
        </FlexItem>
      </Flex>
    </>
  );
};

export default WelcomeComponent;
