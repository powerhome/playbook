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
import { TokenCards } from "./Data/TokenCards";

const linkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "inherit",
  display: "block",
};

const Tokens = () => {
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
        <Title size={1} text="Tokens" marginBottom="sm" />
        <Body>
          Tokens are reusable values that define core design elements like colors, typography, and spacing. They provide consistency across components and Global Props, ensuring scalable and cohesive design throughout the application. See{" "}
          <RouterLink to="/tokens/using_tokens">Using Tokens</RouterLink>
          {" "}for how to import and consume token exports in React and Rails.
        </Body>
        <Layout layout="collection" marginY="xl" paddingBottom="xl">
          <Layout.Body>
            {TokenCards.sort((a, b) => {
              if (a.link === "/tokens/using_tokens") return -1;
              if (b.link === "/tokens/using_tokens") return 1;
              return a.title.localeCompare(b.title);
            }).map(({ title, description, link, icon }) => (
              <RouterLink key={title} to={link} style={linkStyle}>
                <Card padding="none" hover={{ shadow: "deep" }} flex={1}>
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
                    truncate="3"
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

export default Tokens;
