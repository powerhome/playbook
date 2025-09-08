import { ReactElement } from "react";
import { Flex } from "playbook-ui";

type PageContainerProps = {
  children: ReactElement | ReactElement[];
};
export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <Flex
      align="stretch"
      gap="lg"
      maxWidth="xxl"
      marginX="auto"
      orientation="column"
      paddingX="sm"
      paddingBottom="lg"
    >
      {children}
    </Flex>
  );
};
