import React, { useState, useEffect } from 'react'

import Passphrase from '../_passphrase'
import zxcvbn from 'zxcvbn'
import { ProgressSimple, Caption} from '../..'


function useZxcvbn({ passphrase }) {

  const [passphraseStrenght, setPassphraseStrength] = useState({}) //nbsp to keep height constant
  
  const { score } = zxcvbn(passphrase)

  useEffect(() => {
    switch (score) {
      case 1:
        setPassphraseStrength({
          strength: 25,
          message: "This passphrase is too common",
          variant: "negative"
        })
        break;
      case 2:
        setPassphraseStrength({
          strength: 50,
          message: "Too Weak",
          variant: "warning"
        })
        break;
      case 3:
        setPassphraseStrength({
          strength: 75,
          message: "Almost there, keep going!",
          variant: "positive"
        })
        break;
      case 4:
        setPassphraseStrength({
          strength: 100,
          message: "Success! Strong passphrase",
          variant: "positive"
        })
        break;
    }
  }, [passphrase, score]
  )
  return passphraseStrenght
}

const PassphraseExternalLibrary = (props) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const { strength, message, variant } = useZxcvbn({ passphrase: input });
  
  return (
    <>
      <Passphrase
          label="Password Strength Checker"
          onChange={(e) => handleChange(e)}
          value={input}
          {...props}
      />
      {strength && (
        <>
          <ProgressSimple
              className={input.length === 0 ? "progress-empty-input" : null}
              percent={strength}
              variant={variant}
          />
          <Caption 
              size="xs" 
              text={message} 
          />
        </>
      )}
    </>
  );
};

export default PassphraseExternalLibrary
