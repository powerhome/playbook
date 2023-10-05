import React from "react";
import { Background, Flex, FlexItem } from "playbook-ui";
import WelcomeComponent from "./HeroComponents/Welcome";
import ConnectedDevicesCard from "./HeroComponents/ConnectedDevices";
import HoverCard from "./HeroComponents/Hover";
import LettuceCheckboxCard from "./HeroComponents/LettuceCheckbox";
import NewsNavCard from "./HeroComponents/NewsNav";
import NotificationsLargeCard from "./HeroComponents/NotificationsLarge";
import NotificationsSmallCard from "./HeroComponents/NotificationsSmall";
import OrderDetailsCard from "./HeroComponents/OrderDetails";
import SelectPlanCard from "./HeroComponents/SelectPlan";
import SubscribeToggleCard from "./HeroComponents/SubscribeToggle";
import TicketsChartCard from "./HeroComponents/TicketsChart";
import Blur from "./HeroComponents/Blur";

const HomepageHero = () => {
  return (
    <Background
      backgroundColor="white"
      className="homepage_hero_wrapper"
      display="flex"
      justifyContent="center"
    >
      <Flex
        className="homepage_hero_container"
        marginX="md"
        maxWidth="xl"
        orientation="column"
        paddingTop="xl"
        position="relative"
      >
        <Background
          alignItems="center"
          backgroundColor="white"
          display="flex"
          flexDirection="column"
          paddingTop="xl"
        >
          <WelcomeComponent />
        </Background>

        <Background
          className="homepage_hero_container_cards"
          position="absolute"
        >
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
                borderRadius="570.112px"
                filter="blur(100px)"
                flexShrink="0"
                height="427.257px"
                width="570.112px"
              />
            </FlexItem>
          </Flex>
          <TicketsChartCard />
          <NotificationsLargeCard />
          {/* <NewsNavCard /> */}
          <ConnectedDevicesCard />
          <HoverCard />
          <LettuceCheckboxCard />
          {/* <NotificationsSmallCard /> */}
          <OrderDetailsCard />
          <SelectPlanCard />
          <SubscribeToggleCard />
        </Background>
      </Flex>
    </Background>
  );
};

export default HomepageHero;
