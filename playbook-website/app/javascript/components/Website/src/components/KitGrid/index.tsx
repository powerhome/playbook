import React, { ReactElement } from "react";
import { Layout } from "playbook-ui";

import "./styles.scss";

type KitGridProps = {
  children: ReactElement | ReactElement[];
};

export const KitGrid = ({ children }: KitGridProps) => {
  return (
    <Layout layout="collection">
      <Layout.Body className="kit-container">{children}</Layout.Body>
    </Layout>
  );
};
