import { Background, Title, Body } from "playbook-ui";

import HeaderMobile from "../../../../../images/pb-hero-mobile.svg";
import HeaderDesktop from "../../../../../images/pb-hero-desktop.svg";

import "./styles.scss";

type HeroProps = {
  title: string;
  description: string;
  height?: string;
  backgroundPosition?: string;
  minHeight?: string;
};

export function Hero({ title, description, height, backgroundPosition, minHeight }: HeroProps) {
  const backgroundPositionValue = backgroundPosition || "right bottom";
  return (
    <Background
      alt="background with blue colors fading to darker blue"
      className="hero"
      marginBottom="lg"
      marginTop="sm"
      marginX={{ lg: "sm", xl: "sm" }}
      padding="xl"
      paddingTop={{ xs: "lg" }}
      paddingBottom={{ xs: "sm" }}
      backgroundSize={{
        xs: "contain",
        sm: "1320px 245px",
      }}
      backgroundPosition={{
        default: backgroundPositionValue,
        xs: "center top",
        sm: backgroundPositionValue,
        md: backgroundPositionValue,
      }}
      backgroundColor="dark"
      backgroundRepeat="no-repeat"
      imageUrl={{
        default: HeaderDesktop,
        xs: HeaderMobile,
        sm: HeaderDesktop,
        md: HeaderDesktop,
      }}
      height={height}
      minHeight={minHeight}
    >
      <Title
        size={{ xs: 3, sm: 3, md: 2, lg: 2, xl: 2 }}
        paddingTop={{ xs: "none", sm: "xl", md: "none" }}
        paddingBottom={{ xs: "none", default: "sm" }}
        text={title}
        marginBottom={{ xs: "none", md: "xs" }}
        dark
      />
      <Body
        className="hero-description"
        maxWidth="sm"
        lineHeight="loose"
        dark
        text={description}
        truncate="4"
      />
    </Background>
  );
}
