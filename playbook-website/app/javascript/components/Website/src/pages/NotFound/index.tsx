import { EmptyState, Flex } from "playbook-ui";
import ThisIsFineImage from "../../../../../images/this_is_fine.svg";

import "./styles.scss";

type NotFoundProps = {
  description?: string,
  header?: string,
};

const NotFound = ({
  description = "We could not find a page at this URL. Check the address and try again, or choose a page from the navigation or search.",
  header = "Page Not Found",
}: NotFoundProps) => {
  return (
    <div className="kit-show-wrapper">
      <Flex justify="center" width="100%" paddingTop="xl" className="no-kit-empty-state-container">
        <EmptyState
          header={header}
          description={description}
          image={ThisIsFineImage}
          size="lg"
          className="not-found-empty-state"
        />
      </Flex>
    </div>
  );
};

export default NotFound;
