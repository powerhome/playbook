/* @flow */

import React from 'react'

type Props = {
  branch: string,
  children: Array<React.Component>,
  prNumber: number,
}

export default class Wip extends React.Component<Props> {
  props: Props
  render() {
    const {
      branch,
      children,
      prNumber,
    } = this.props

    return (
      <div>
        <div className="alert alert-warning">
          {`W.I.P. see `}
          <a
              href={`https://github.com/powerhome/nitro-storybook/pull/${prNumber}`}
          >
              {branch}
          </a>
        </div>
        {children}
      </div>
    )
  }
}