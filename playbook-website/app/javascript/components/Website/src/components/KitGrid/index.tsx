import { ReactElement } from "react";
import { Layout } from "playbook-ui";

import "./styles.scss";

type KitGridProps = {
  children: ReactElement | ReactElement[];
};

export const KitGrid = ({ children }: KitGridProps) => {
  return (
    <div className="kit-grid-shell">
      <Layout className="kit-grid-layout" layout="collection" width="100%">
        <Layout.Body className="kit-container">{children}</Layout.Body>
      </Layout>
    </div>
  );
};
