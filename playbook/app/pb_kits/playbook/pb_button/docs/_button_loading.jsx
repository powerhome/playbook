import React from 'react'
import Button from "../../pb_button/_button"
import Caption from "../../pb_caption/_caption"

const ButtonLoading = (props) => (
  <div>
    <Caption 
        marginY="md" 
        text="Button variants with loading" 
    />
    <Button
        aria={{ label: 'Loading' }}
        loading
        marginRight='lg'
        
        text="Button Primary"
        {...props}
    />
    {' '}
    <Button
        aria={{ label: 'Loading' }}
        loading
        marginRight='lg'
        tabIndex={0}
        text="Button Secondary"
        variant="secondary"
        {...props}
    />
    {' '}
    <Button
        aria={{ label: 'Loading' }}
        loading
        marginRight='lg'
        tabIndex={0}
        text="A Tag Button Disabled"
        variant="link"
        {...props}
    />
    <br/>
    <Caption 
        marginY="md" 
        text="Button sizes with loading" 
    />
    <Button
        aria={{ label: 'Loading' }}
        loading
        marginRight='lg'
        size="sm"
        tabIndex={0}
        text="Small Button"
        {...props}
    />
    {' '}
    <Button
        aria={{ label: 'Loading' }}
        loading
        marginRight='lg'
        size="lg"
        tabIndex={0}
        text="Small Button"
        {...props}
    />
  </div>
)

export default ButtonLoading
