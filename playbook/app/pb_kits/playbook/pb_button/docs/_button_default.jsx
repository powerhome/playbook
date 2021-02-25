import React from 'react'
import { Button } from '../../'

const htmlType = 'submit',
  link = 'https://www.google.com',
  text = 'Button Text',
  value = '1234'

const ButtonDefault = (props) => (
  // <div>
  //   <Button
  //       marginRight="xl"
  //       onClick={() => alert('button clicked!')}
  //       text="Button Primary"
  //       {...props}
  //   />
  //   {' '}
  //   <Button
  //       onClick={() => alert('button clicked!')}
  //       text="Button Secondary"
  //       variant="secondary"
  //       {...props}
  //   />
  //   {' '}
  //   <Button
  //       onClick={() => alert('button clicked!')}
  //       text="Button Link"
  //       variant="link"
  //       {...props}
  //   />
  //   <Button
  //       disabled
  //       onClick={() => alert('button clicked!')}
  //       text="Button Disabled"
  //       {...props}
  //   />
  // </div>
  <Button
      data={{ testid: 'primary-test' }}
      htmlType={htmlType}
      // link={link}
      text={text}
      value={value}
  />
)

export default ButtonDefault
