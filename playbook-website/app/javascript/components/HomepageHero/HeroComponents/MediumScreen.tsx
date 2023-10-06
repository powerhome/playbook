import React from "react";
import { Background, Flex, FlexItem, Image } from "playbook-ui";
import WelcomeComponent from "./Welcome";
import ConnectedDevicesCard from "./ConnectedDevices";
import NotificationsSmallCard from "./NotificationsSmall";
import OrderDetailsCard from "./OrderDetails";
import SelectPlanCard from "./SelectPlan";
import SubscribeToggleCard from "./SubscribeToggle";
import TicketsChartCard from "./TicketsChart";
import Blur from "./Blur";
// @ts-ignore
import GridLarge from "../../../images/LargeBackgroundGrid.svg";

const MediumScreen = () => {
  return (
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
          fixedSize="963px"
          headerAlign="center"
          ButtonsAlignment="center"
          displayProps={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        />
      </Background>

      <Background className="homepage_hero_container_cards" position="relative">
        {/* <Image
          url={GridLarge}
          position="absolute"
          className="homepage_hero_container_cards_grid"
        />
        <Flex orientation="column">
          <FlexItem
            alignSelf="end"
            className="homepage_hero_container_cards_blur_1"
            position="absolute"
          >
            <Blur
              background="var(--data-3, #9E64E9)"
              borderRadius="570.112px"
              filter="blur(100px)"
              flexShrink="0"
              height="164.619px"
              width="219.661px"
            />
          </FlexItem>
          <FlexItem
            className="homepage_hero_container_cards_blur_2"
            position="absolute"
          >
            <Blur
              background="rgba(0, 130, 255, 0.25)"
              borderRadius="var(--border-radius-none, 402px)"
              filter="blur(100px)"
              flexShrink="0"
              height="301px"
              width="402px"
            />
          </FlexItem>
        </Flex> */}
        <TicketsChartCard />
        <ConnectedDevicesCard />
        <NotificationsSmallCard />
        <OrderDetailsCard />
        <SelectPlanCard />
        <SubscribeToggleCard />
      </Background>
    </Flex>
  );
};

export default MediumScreen;
