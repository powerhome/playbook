import React from 'react'
import { Background } from '../..'
// import style from './style.css'

const BackgroundWhite = (props) => (
  <div>
    <Background
        backgroundColor="white"
        padding="xl"
        {...props}
        // className={style.classy}
    />
  </div>

)

export default BackgroundWhite
