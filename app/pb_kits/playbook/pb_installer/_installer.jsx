/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Caption, Icon, Title } from '../'

const renderProjectName = (link, projectName) => {
  if (link) {
    return (
      <a
          className="pb_installer_kit_links"
          href={link}
      >
        <Title
            size={4}
            tag="span"
            text={projectName}
        />
      </a>
    )
  }

  return (
    <Title
        size={4}
        tag="span"
        text={projectName}
    />
  )
}

type InstallerProps = {
  link?: String,
  projectName: String,
}

const Installer = ({
  link,
  projectName,
}: InstallerProps) => (
  <div className={classnames('pb_installer_kit')}>
    <Body color="light">
      <Caption text="Installer" />
      <Icon
          fixedwidth
          icon="truck"
      />
      {' '}
      {renderProjectName(link, projectName)}
    </Body>
  </div>
)

export default Installer
