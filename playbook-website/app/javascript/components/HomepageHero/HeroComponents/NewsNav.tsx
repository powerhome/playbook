import React, { useState } from "react";
import {
  Flex,
  Card,
  Nav,
  NavItem,
  CircleIconButton,
  PbReactPopover,
  Icon,
} from "playbook-ui";

const NewsNavCard = () => {
  const [isIdActive, setIsIdActive] = useState(1);

  const [showPopover, setShowPopover] = useState(false);

  const handleTogglePopover = () => {
    setShowPopover(!showPopover);
  };

  const handleOutsideShouldClosePopover = (shouldClosePopover) => {
    setShowPopover(!shouldClosePopover);
  };

  const popoverReference = (
    <CircleIconButton
      variant="link"
      icon="ellipsis-h"
      onClick={handleTogglePopover}
    />
  );

  return (
    <Flex className="news_nav">
      <Card borderNone borderRadius="lg" shadow="deep" padding="xs">
        <Flex align="center">
          <Nav link="#" orientation="horizontal" variant="subtle">
            <NavItem
              active={isIdActive === 1}
              onClick={() => {
                setIsIdActive(1);
              }}
              link="#"
              text="Trending"
              iconLeft="newspaper"
            />
            <NavItem
              active={isIdActive === 2}
              onClick={() => {
                setIsIdActive(2);
              }}
              link="#"
              text="World"
              iconLeft="globe"
            />
            <NavItem
              active={isIdActive === 3}
              onClick={() => {
                setIsIdActive(3);
              }}
              link="#"
              text="Business"
              iconLeft="chart-line"
            />
          </Nav>
          <PbReactPopover
            closeOnClick="outside"
            placement="bottom"
            reference={popoverReference}
            show={showPopover}
            shouldClosePopover={handleOutsideShouldClosePopover}
            padding="none"
          >
            <Nav variant="subtle">
              <NavItem
                active={isIdActive === 4}
                onClick={() => {
                  setIsIdActive(4);
                }}
                iconLeft="map-marked-alt"
                link="#"
                text="Local"
              />
              <NavItem
                active={isIdActive === 5}
                onClick={() => {
                  setIsIdActive(5);
                }}
                iconLeft="cogs"
                link="#"
                text="Tech"
              />
              <NavItem
                active={isIdActive === 6}
                onClick={() => {
                  setIsIdActive(6);
                }}
                iconLeft="palette"
                link="#"
                text="Culture"
              />
              <NavItem
                active={isIdActive === 7}
                onClick={() => {
                  setIsIdActive(7);
                }}
                iconLeft="baseball-bat-ball"
                link="#"
                text="Sports"
              />
            </Nav>
          </PbReactPopover>
          <Flex paddingLeft="md">
            <a href="#">
              <Icon icon="th-large" />
              <Icon icon="caret-down" />
            </a>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default NewsNavCard;
