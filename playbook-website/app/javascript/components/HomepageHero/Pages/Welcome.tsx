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
};

const WelcomeComponent = ({
  fixedSize,
  headerAlign,
  buttonsAlignment,
  displayProps,
  titleSize,
}: WelcomeProps) => {
  return (
    <>
      <Flex className="welcome_component">
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
            {Logos.map(({ text, logo }) => (
              <>
                <Flex align="center" paddingRight="sm">
                  <Image url={logo} />
                  <Body paddingLeft="xxs" text={text} color="light" />
                </Flex>
              </>
            ))}
          </Flex>
          <Flex justifyContent={buttonsAlignment}>
            <Button
              fixedWidth
              icon="arrow-right"
              iconRight
              link="/guides/getting_started"
              marginRight="sm"
              tabIndex={0}
              text="Get started"
              zIndex={2}
            />
            <Button
              fixedWidth
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
