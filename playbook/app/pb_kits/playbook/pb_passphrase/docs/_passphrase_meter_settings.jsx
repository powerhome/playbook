import React, { useState } from 'react'

import Body from '../../pb_body/_body'
import Passphrase from '../../pb_passphrase/_passphrase'
import ProgressSimple from '../../pb_progress_simple/_progress_simple'
import Caption from '../../pb_caption/_caption'
import TextInput from '../../pb_text_input/_text_input'

import zxcvbn from 'zxcvbn'


const PassphraseMeterSettings = (props) => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState({})
  const [calculatedStrength, setCalculatedStrength] = useState(0)

  const meterSettings = [
    {
      label: "Default settings"
    },
    {
      minLength: 5,
      label: "Min length = 5",
    },
    {
      minLength: 30,
      label: "Min length = 30",
    },
    {
      label: "Average threshold = 1",
      averageThreshold: 1,
    },
    {
      label: "Strong Threshold = 4",
      strongThreshold: 4,
    },
  ]
  
  const handleStrengthCalculation = (settings) => {
    const {
        passphrase = "",
        common = false,
        isPwned = false,
        averageThreshold = 2,
        minLength = 12,
        strongThreshold = 3,
      } = settings

    const resultByScore = {
      0: {
        variant: 'negative',
        label: '',
        percent: 0,
      },
      1: {
        variant: 'negative',
        label: 'This passphrase is too common',
        percent: 25,
      },
      2: {
        variant: 'negative',
        label: 'Too weak',
        percent: 25,
      },
      3: {
        variant: 'warning',
        label: 'Almost there, keep going!',
        percent: 50,
      },
      4: {
        variant: 'positive',
        label: 'Success! Strong passphrase',
        percent: 100,
      }
    }

    const { score } = zxcvbn(passphrase);

    const noPassphrase = passphrase.length <= 0
    const commonPassphrase = common || isPwned
    const weakPassphrase = passphrase.length < minLength || score < averageThreshold
    const averagePassphrase = score < strongThreshold
    const strongPassphrase = score >= strongThreshold

    if (noPassphrase) {
      return {...resultByScore[0], score}
    } else if (commonPassphrase) {
      return {...resultByScore[1], score}
    } else if (weakPassphrase) {
      return {...resultByScore[2], score}
    } else if (averagePassphrase){
      return {...resultByScore[3], score}
    } else if (strongPassphrase) {
      return {...resultByScore[4], score}
    }
  }

  
  const handleChange = (e) => {
    const passphrase = e.target.value;

    setInput(passphrase) 

    const calculated = []

    meterSettings.forEach((setting, index) => {
      const results = handleStrengthCalculation({passphrase, ...setting})
      if (index == 0) setCalculatedStrength(results.score)
      calculated.push(results)
    })

    setResult(calculated)
  }

  return (
    <>
      <div>
        <Body>
          {
            "These examples will all share the same input value. Type in any of the inputs to see how the strength meter changes in response to different settings."
          }
        </Body>
        <br/>
        <Passphrase
            label={"Type your passphrase"}
            onChange={handleChange}
            value={input}
            {...props}
        />
        <TextInput
            disabled
            label="Calculated Strength"
            readOnly
            value={calculatedStrength}
        />
        {meterSettings.map((settings, index) => (
          <div key={index}>
            <Passphrase
                label={settings.label}
                onChange={handleChange}
                value={input}
                {...props}
            />
            {input.length > 0 && (
              <>
                <ProgressSimple
                    percent={result[index].percent}
                    variant={result[index].variant}
                />
                <Caption size='xs'
                    text={result[index].label} 
                />
              </>
            )}
          </div>
        ))}
        
      </div>
    </>
  );
}

export default PassphraseMeterSettings
