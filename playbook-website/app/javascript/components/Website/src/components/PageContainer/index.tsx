import { type ComponentProps, type ReactElement } from "react";
import { Flex } from "playbook-ui";

type PageContainerProps = {
  children: ReactElement | ReactElement[];
  marginTop?: ComponentProps<typeof Flex>["marginTop"];
};

export const PageContainer = ({
  children,
  marginTop = "none",
}: PageContainerProps) => {
  return (
    <Flex
      align="stretch"
      maxWidth="xxl"
      marginX="auto"
      orientation="column"
      marginBottom="lg"
      marginTop={marginTop}
    >
      {children}
    </Flex>
  );
};
