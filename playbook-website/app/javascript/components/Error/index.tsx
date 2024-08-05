import React from 'react';
import { Caption, Icon, Title } from 'playbook-ui';
import styles from './styles.module.scss';

const Error = () => {
  return (
    <div className={styles.error}>
      <Icon className={styles.icon} icon="warning" size="3x" />
      <Title text="404" size={1} />
      <Caption>Page not found</Caption>
    </div>
  );
}

export default Error;
