/* @flow */

import React from 'react'
import classname from 'classnames'

import styles from './styles.scss'

type FlipProps = {
  children: React.ChildrenArray<React.Element<typeof FlipFront | typeof FlipBack>>,
  flipped: boolean,
}

type FlipSideProps = {
  children?: React.Node,
  className?: string,
}

const Flip = ({ children, flipped }: FlipProps) => (
  <div className={styles['flip-container']}>
    <div className={
        classname({
          [styles['flip']]: flipped,
          [styles['flap']]: !flipped,
        })
      }
    >
      {children}
    </div>
  </div>
)

// eslint-disable-next-line react/no-multi-comp
const FlipFront = ({
  children,
  className,
}: FlipSideProps) => (
  <div className={classname(styles.front, className)}>{children}</div>
)

// eslint-disable-next-line react/no-multi-comp
const FlipBack = ({
  children,
  className,
}: FlipSideProps) => (
  <div className={classname(styles.back, className)}>{children}</div>
)

Flip.Front = FlipFront
Flip.Back = FlipBack
export default Flip
