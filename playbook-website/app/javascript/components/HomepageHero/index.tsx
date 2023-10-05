import React from "react";
import { Background, Flex } from "playbook-ui";
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

const HomepageHero = () => {
  return (
    <Background
      className="homepage_hero_wrapper"
      display="flex"
      justifyContent="center"
      backgroundColor="white"
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
          paddingTop="xl"
          backgroundColor="white"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <WelcomeComponent />
        </Background>

        <Background className="homepage_hero_container_cards">
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
