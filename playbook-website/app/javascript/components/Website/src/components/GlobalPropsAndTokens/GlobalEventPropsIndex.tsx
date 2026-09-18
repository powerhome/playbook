import {
  Background,
  Layout,
  Card,
  Icon,
  Flex,
  Title,
  Body,
  IconCircle,
} from "playbook-ui";
import { Link as RouterLink } from "react-router-dom";
import HeaderImage from "images/getting-started.svg";
import { GlobalEventPropsCards } from "./Data/GlobalEventPropsCards";

const linkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "inherit",
  display: "block",
};

const GlobalEventProps = () => {
  return (
    <Background
      className="global-props-tokens-landing"
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
        minHeight="250px"
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
        <Title size={1} text="Global Event Props" marginBottom="sm" />
        <Body>
          Global Event Props are React event handlers that opted-in kits can
          accept as first-class props. They are separate from class-based Global
          Props. Because they are JavaScript callbacks, they are available in
          React only - not on Rails kits.
        </Body>
        <Layout layout="collection" marginY="xl" paddingBottom="xl">
          <Layout.Body>
            {GlobalEventPropsCards.sort((a, b) => a.title.localeCompare(b.title)).map(({ title, description, link, icon }) => (
              <RouterLink key={title} to={link} style={linkStyle}>
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
              </RouterLink>
            ))}
          </Layout.Body>
        </Layout>
      </Background>
    </Background>
  );
};

export default GlobalEventProps;
