import React from "react";
import { Flex, FlexItem } from "playbook-ui";
import Blur from "../HeroComponents/Blur";

const BlurBackground = ({
  firstBlurClass,
  firstBlurHeight,
  firstBlurWidth,
  secondBlurClass,
  secondBlurHeight,
  secondBlurWidth,
}) => {
  return (
    <>
      <Flex orientation="column">
        <FlexItem
          alignSelf="end"
          className={`homepage_hero_container_cards_${firstBlurClass}`}
          position="absolute"
        >
          <Blur
            background="var(--data-3, #9E64E9)"
            borderRadius="570.112px"
            filter="blur(100px)"
            flexShrink="0"
            height={firstBlurHeight}
            width={firstBlurWidth}
          />
        </FlexItem>
        <FlexItem
          className={`homepage_hero_container_cards_${secondBlurClass}`}
          position="absolute"
        >
          <Blur
            background="rgba(0, 130, 255, 0.25)"
            borderRadius="var(--border-radius-none, 402px)"
            filter="blur(100px)"
            flexShrink="0"
            height={secondBlurHeight}
            width={secondBlurWidth}
          />
        </FlexItem>
      </Flex>
    </>
  );
};

export default BlurBackground;
