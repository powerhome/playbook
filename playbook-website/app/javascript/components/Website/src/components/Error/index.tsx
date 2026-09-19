import React from 'react';
import { Button, Caption, Flex, Icon, Title } from 'playbook-ui';
import {
  isStagingHost,
  withStagingCacheBust,
} from '../../utils/siteNavigation';
import styles from './styles.module.scss';

const Error = () => {
  const onStaging = isStagingHost();

  const reloadWithoutStaleCache = () => {
    window.location.assign(withStagingCacheBust(window.location.href));
  };

  return (
    <div className={styles.error}>
      <Icon className={styles.icon} icon="warning" size="3x" />
      <Title text="404" size={1} />
      <Caption>
        {onStaging
          ? "If you just reconnected to the VPN, reload to bypass a cached offline response."
          : "Page not found"}
      </Caption>
      {onStaging && (
        <Flex justify="center" marginTop="sm">
          <Button
            onClick={reloadWithoutStaleCache}
            text="Reload Playground"
            variant="primary"
          />
        </Flex>
      )}
    </div>
  );
}

export default Error;
