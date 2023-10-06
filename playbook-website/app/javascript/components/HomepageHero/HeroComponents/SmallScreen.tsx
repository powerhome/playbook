import React from "react";
import { Background, Flex, FlexItem, Image } from "playbook-ui";
import WelcomeComponent from "./Welcome";
import ConnectedDevicesCard from "./ConnectedDevices";
import OrderDetailsCard from "./OrderDetails";
import SubscribeToggleCard from "./SubscribeToggle";
import TicketsChartCard from "./TicketsChart";
// import Blur from "./Blur";
// // @ts-ignore
// import GridMedium from "../../../images/MediumBackgroundGrid.svg";

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
            ButtonsAlignment="center"
            displayProps={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          />
        </Background>

        <Background
          className="homepage_hero_container_cards"
          position="relative"
        >
          {/* <Image
          url={GridMedium}
          position="absolute"
          className="homepage_hero_container_cards_grid2"
        />
        <Flex orientation="column">
          <FlexItem
            alignSelf="end"
            className="homepage_hero_container_cards_blur_3"
            position="absolute"
          >
            <Blur
              background="var(--data-3, #9E64E9)"
              borderRadius="570.112px"
              filter="blur(100px)"
              flexShrink="0"
              height="138.544px"
              width="184.867px"
            />
          </FlexItem>
          <FlexItem
            className="homepage_hero_container_cards_blur_4"
            position="absolute"
          >
            <Blur
              background="rgba(0, 130, 255, 0.25)"
              borderRadius="var(--border-radius-none, 479.808px)"
              filter="blur(100px)"
              flexShrink="0"
              height="359.581px"
              width="479.808px"
            />
          </FlexItem>
        </Flex> */}
          <ConnectedDevicesCard />
          <OrderDetailsCard />
          <SubscribeToggleCard />
          <TicketsChartCard/>
        </Background>
      </Flex>
    </>
  );
};

export default SmallScreen;
