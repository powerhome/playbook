import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Background, Flex } from "playbook-ui";
import MaxScreen from "./Pages/MaxScreen";
import MediumScreen from "./Pages/MediumScreen";
import SmallScreen from "./Pages/SmallScreen";
import MobileScreen from "./Pages/MobileScreen";
import { homepageHeroCTALinks } from "./ctaLinks";

const HomepageHero = () => {
  const navigate = useNavigate();
  const [isMax, setIsMax] = useState(window.innerWidth > 1376);
  const [isMedium, setIsMedium] = useState(window.innerWidth > 1147);
  const [isMobile, setIsMobile] = useState(window.innerWidth > 575);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMax(window.innerWidth > 1376);
      setIsMedium(window.innerWidth > 1147);
      setIsMobile(window.innerWidth > 575);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setIsMax(window.innerWidth > 1376);
        setIsMedium(window.innerWidth > 1147);
        setIsMobile(window.innerWidth > 575);
      });
    };
  }, []);

  const onNavigate = (path: string) => navigate(path);

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
          width="xl"
      >
        {isMax ? (
          <MaxScreen ctaLinks={homepageHeroCTALinks} onNavigate={onNavigate} />
        ) : isMedium ? (
          <MediumScreen ctaLinks={homepageHeroCTALinks} onNavigate={onNavigate} />
        ) : isMobile ? (
          <SmallScreen ctaLinks={homepageHeroCTALinks} onNavigate={onNavigate} />
        ) : (
          <MobileScreen ctaLinks={homepageHeroCTALinks} onNavigate={onNavigate} />
        )}
      </Flex>
    </Background>
  );
};

export default HomepageHero
