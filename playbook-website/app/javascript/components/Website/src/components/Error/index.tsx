import React, { useEffect } from 'react';
import { Button, Caption, Flex, Icon, Title } from 'playbook-ui';
import {
  isStagingHost,
  stagingIsReachable,
  withStagingCacheBust,
} from '../../utils/siteNavigation';
import styles from './styles.module.scss';

const STAGING_404_RETRY_KEY = 'pb-staging-404-retry';

const retryAlreadyUsed = () => {
  try {
    return sessionStorage.getItem(STAGING_404_RETRY_KEY) === '1';
  } catch {
    return false;
  }
};

const markRetryUsed = () => {
  sessionStorage.setItem(STAGING_404_RETRY_KEY, '1');
};

const reloadBypassingCache = () => {
  window.location.replace(withStagingCacheBust(window.location.href));
};

const Error = () => {
  const onStaging = isStagingHost();
  const [autoRetryPending] = React.useState(onStaging && !retryAlreadyUsed());

  // Our shell loaded, but a cached staging 404 can still be on screen. Once
  // staging answers (VPN is up), load a new URL so the stored 404 is not reused.
  useEffect(() => {
    if (!autoRetryPending) return;

    let cancelled = false;
    let started = false;

    const tryRecover = async () => {
      if (cancelled || started || retryAlreadyUsed()) return;
      const reachable = await stagingIsReachable();
      if (cancelled || !reachable || started || retryAlreadyUsed()) return;

      started = true;
      try {
        markRetryUsed();
      } catch {
        started = false;
        return;
      }

      reloadBypassingCache();
    };

    void tryRecover();
    const id = window.setInterval(() => {
      void tryRecover();
    }, 3000);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [autoRetryPending]);

  const reload = () => {
    try {
      markRetryUsed();
    } catch {
      // Private mode can block storage; the navigation itself is the retry.
    }
    reloadBypassingCache();
  };

  return (
    <div className={styles.error}>
      <Icon className={styles.icon} icon="warning" size="3x" />
      <Title text="404" size={1} />
      <Caption>
        {autoRetryPending
          ? 'If you just connected to the VPN, this page will reload on its own.'
          : 'Page not found'}
      </Caption>
      {onStaging && (
        <Flex justify="center" marginTop="sm">
          <Button
            onClick={reload}
            text="Reload"
            variant="primary"
          />
        </Flex>
      )}
    </div>
  );
}

export default Error;
