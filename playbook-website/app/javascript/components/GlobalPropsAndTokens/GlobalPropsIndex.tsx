import {
  Background,
  Layout,
  Card,
  Icon,
  Flex,
  Title,
  Body,
  Link,
  IconCircle,
} from "playbook-ui";
import { Link as RouterLink } from "react-router-dom";
import HeaderImage from "../../images/getting-started.svg";
import { GlobalPropsCards } from "./Data/GlobalPropsCards";

type GlobalPropsProps = {
  linkPrefix?: string,
}

const betaClientNavLinkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "inherit",
  display: "block",
};

const GlobalProps = ({ linkPrefix = "" }: GlobalPropsProps) => {
  const useClientNav = linkPrefix === "/beta";

  return (
    <Background
      flexDirection="column"
      backgroundColor="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Background
        imageUrl={HeaderImage}
        width="100%"
        display={{ xs: "none", sm: "none", md: "none" }}
        height="250px"
        backgroundColor="dark"
        backgroundSize="contain"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      />
      <Background
        paddingX={{ xs: "sm", sm: "sm", md:"sm", lg: "sm", default:"none" }}
        paddingY="md"
        backgroundColor="white"
        maxWidth="lg"
      >
        <Title size={1} text="Global Props" marginBottom="sm" />
        <Body text="Global Props are universal settings that apply to all components in our design system. They use Token values to control aspects like spacing, colors, and typography, ensuring consistent design and behavior across your application." />
        <Layout layout="collection" marginY="xl" paddingBottom="xl">
          <Layout.Body>
            {GlobalPropsCards.sort((a, b) => a.title.localeCompare(b.title)).map(({ title, description, link, icon }) => {
              const href = `${linkPrefix}${link}`;
              const card = (
                <Card padding="none" hover={{ shadow: "deep" }} flex={1} minHeight="300px">
                  <Background backgroundColor="light">
                    <Flex justify="center" padding="xl">
                      <IconCircle icon={icon} variant="royal" />
                    </Flex>
                  </Background>

                  <Flex justify="between" align="center" padding="sm">
                    <Title size={4} color="link" text={title} />
                    <Icon
                        aria={{ hidden: true }} 
                        color="link" 
                        icon="arrow-right-long" 
                    />
                  </Flex>

                  <Body
                    text={description}
                    truncate="4"
                    color="light"
                    marginX="sm"
                    marginBottom="sm"
                  />
                </Card>
              );

              return useClientNav ? (
                <RouterLink key={title} to={href} style={betaClientNavLinkStyle}>
                  {card}
                </RouterLink>
              ) : (
                <Link key={title} href={href}>
                  {card}
                </Link>
              );
            })}
          </Layout.Body>
        </Layout>
      </Background>
    </Background>
  );
};

export default GlobalProps;
