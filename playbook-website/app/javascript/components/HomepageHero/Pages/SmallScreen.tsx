import React from "react";
import { Background, Flex, FlexItem, Image } from "playbook-ui";
import WelcomeComponent from "./Welcome";
import ConnectedDevicesCard from "../HeroComponents/ConnectedDevices";
import OrderDetailsCard from "../HeroComponents/OrderDetails";
import SubscribeToggleCard from "../HeroComponents/SubscribeToggle";
import TicketsChartCard from "../HeroComponents/TicketsChart";
import Blur from "../HeroComponents/Blur";
// @ts-ignore
import GridSmall from "../../../images/SmallBackgroundGrid.svg";

const SmallScreen = () => {
  return (
    <>
      <Flex
        className="homepage_hero_container"
        marginX="md"
        maxWidth="xl"
        orientation="column"
        paddingTop="xl"
      >
        <Background
          alignItems="center"
          backgroundColor="white"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          paddingTop="xl"
          paddingBottom="sm"
        >
          <WelcomeComponent
            fixedSize="599px"
            headerAlign="center"
            buttonsAlignment="center"
            displayProps={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          />
        </Background>

        <Background
          className="homepage_hero_container_cards"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          <Image
            url={GridSmall}
            className="homepage_hero_container_cards_grid3"
          />
          <Flex orientation="column">
            <FlexItem
              alignSelf="end"
              className="homepage_hero_container_cards_blur_5"
              position="absolute"
            >
              <Blur
                background="var(--data-3, #9E64E9)"
                borderRadius="570.112px"
                filter="blur(75px)"
                flexShrink="0"
                height="129px"
                width="128px"
              />
            </FlexItem>
            <FlexItem
              className="homepage_hero_container_cards_blur_6"
              position="absolute"
            >
              <Blur
                background="rgba(0, 130, 255, 0.25)"
                borderRadius="var(--border-radius-none, 479.808px)"
                filter="blur(75px)"
                flexShrink="0"
                height="160px"
                width="252px"
              />
            </FlexItem>
          </Flex>
          <ConnectedDevicesCard />
          <OrderDetailsCard />
          <SubscribeToggleCard />
          <TicketsChartCard />
        </Background>
      </Flex>
    </>
  );
};

export default SmallScreen;
