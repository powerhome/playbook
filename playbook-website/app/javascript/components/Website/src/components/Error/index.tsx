import { Button, Caption, Flex, Icon, Title } from 'playbook-ui';
import {
  isStagingHost,
  withStagingCacheBust,
} from '../../utils/siteNavigation';
import styles from './styles.module.scss';

const Error = () => {
  const onStaging = isStagingHost();

  // New `_pb` so a refresh does not reuse a 404 cached for this exact staging URL.
  const reload = () => {
    window.location.replace(withStagingCacheBust(window.location.href));
  };

  return (
    <div className={styles.error}>
      <Icon className={styles.icon} icon="warning" size="3x" />
      <Title text="404" size={1} />
      <Caption>
        {onStaging
          ? 'If you just connected to the VPN, reload this page.'
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
