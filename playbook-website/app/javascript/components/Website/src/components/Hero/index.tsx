import { Background, Title, Body } from "playbook-ui";

import HeaderMobile from "../../../../../images/pb-hero-mobile.svg";
import HeaderDesktop from "../../../../../images/pb-hero-desktop.svg";

import "./styles.scss";

const COMPONENTS_PAGE_DESKTOP_BACKGROUND_SIZE = "1320px 245px";
const CATEGORY_PAGE_DESKTOP_BACKGROUND_SIZE = "auto 180px";

type HeroProps = {
  title: string;
  description: string;
  height?: string;
  backgroundPosition?: string;
  minHeight?: string;
  compact?: boolean;
};

export function Hero({
  title,
  description,
  height,
  backgroundPosition,
  minHeight,
  compact = false,
}: HeroProps) {
  const backgroundPositionValue = backgroundPosition || "right bottom";
  const heroClassName = compact ? "hero hero-compact" : "hero";
  const responsiveBackgroundSize = compact
    ? {
        xs: "contain",
        default: CATEGORY_PAGE_DESKTOP_BACKGROUND_SIZE,
      }
    : {
        xs: "contain",
        default: COMPONENTS_PAGE_DESKTOP_BACKGROUND_SIZE,
      };

  return (
    <Background
      alt="background with blue colors fading to darker blue"
      className={heroClassName}
      marginBottom="lg"
      marginTop={{ xs: "none", sm: "none", md: "none", default: "sm" }}
      marginX={{ lg: "sm", xl: "sm" }}
      padding={compact ? "sm" : "xl"}
      paddingX={compact ? "xl" : undefined}
      paddingTop={compact ? "lg" : { xs: "lg" }}
      paddingBottom={compact ? "lg" : { xs: "lg" }}
      backgroundSize={responsiveBackgroundSize}
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
      <div className="hero-content-well">
        <Title
          size={{ xs: 3, sm: 3, md: 2, lg: 2, xl: 2 }}
          paddingTop={compact ? "none" : { xs: "none", sm: "xl", md: "none" }}
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
          truncate={compact ? "2" : "4"}
        />
      </div>
    </Background>
  );
}
