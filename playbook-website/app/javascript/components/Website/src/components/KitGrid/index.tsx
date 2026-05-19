import { ReactElement } from "react";
import { Layout } from "playbook-ui";

import "./styles.scss";

type KitGridProps = {
  children: ReactElement | ReactElement[];
  layoutClassName?: string;
};

export const KitGrid = ({ children, layoutClassName }: KitGridProps) => {
  const layoutClasses = ["kit-grid-layout", layoutClassName].filter(Boolean).join(" ");

  return (
    <div className="kit-grid-shell">
      <Layout className={layoutClasses} layout="collection" width="100%">
        <Layout.Body className="kit-container">{children}</Layout.Body>
      </Layout>
    </div>
  );
};
