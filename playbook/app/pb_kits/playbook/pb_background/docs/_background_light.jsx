import React from 'react'
import { Background } from '../..'
import styles from './style.scss'

const BackgroundLight = (props) => (
  <Background
      backgroundColor="light"
      padding="xl"
      {...props}
      className={styles.classy}
  />
)

export default BackgroundLight
