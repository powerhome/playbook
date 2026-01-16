import { ReactElement } from "react";
import { Flex } from "playbook-ui";

type PageContainerProps = {
  children: ReactElement | ReactElement[];
};
export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <Flex
      align="stretch"
      maxWidth="xxl"
      marginX="auto"
      orientation="column"
      marginY="lg"
    >
      {children}
    </Flex>
  );
};
