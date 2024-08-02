/* eslint-disable */
import React from "react"
import { Button } from "playbook-ui"
import { createTheme } from '@vanilla-extract/css';
import { buttonThemeVars } from './../buttonThemeContract.css.ts';

const customTheme = createTheme(buttonThemeVars, {
  colors: {
    primary: {
      background: '#ff0000',
      // ... other colors
    },
    // ... other color variants
  },
  sizes: {
    sm: '0.7rem',
    md: '0.9rem',
    lg: '1.2rem',
  },
  // ... other theme properties
});

const ButtonDefault = (props) => (
  <div>
    <ThemeProvider theme={customTheme}>
      <Button variant="primary" size="md">Themed Button</Button>
    </ThemeProvider>
    <Button
        marginRight='lg'
        onClick={() => alert("button clicked!")}
        tabIndex={0}
        text='Button Primary'
        {...props}
    />{" "}
    <Button
        marginRight='lg'
        onClick={() => alert("button clicked!")}
        tabIndex={0}
        text='Button Secondary'
        variant='secondary'
        {...props}
    />{" "}
    <Button
        marginRight='lg'
        onClick={() => alert("button clicked!")}
        tabIndex={0}
        text='Button Link'
        variant='link'
        {...props}
    />
    <Button
        disabled
        marginRight='lg'
        onClick={() => alert("button clicked!")}
        tabIndex={0}
        text='Button Disabled'
        {...props}
    />
  </div>
)

export default ButtonDefault
