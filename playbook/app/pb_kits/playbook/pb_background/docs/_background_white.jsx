import React from 'react'
import { Background } from '../..'
import styles from './style.css'

const BackgroundWhite = (props) => (
  <div>
    <Background
        backgroundColor="white"
        padding="xl"
        {...props}
        className={styles.classy}
    />
  </div>

)

export default BackgroundWhite
