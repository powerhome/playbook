import React from 'react'

import { Typeahead } from 'playbook-ui'
import { useForm } from 'react-hook-form'

const labels = [
  { label: 'Verve', value: '1956' },
  { label: 'Stax', value: '1957' },
  { label: 'Motown', value: '1959' },
  { label: 'Kudu', value: '1971' },
  { label: 'Stones Throw', value: '1996' },
]

const TypeaheadReactHook = (props) => {
  const { register, watch } = useForm()

  const selectedBadges = watch('badges')

  return (
    <>
      <Typeahead
          defaultValue={[labels[0]]}
          label="Badges"
          multiKit="badge"
          options={labels}
          {...props}
          {...register('badges')}
      />
      <p>{`Selected badge: ${selectedBadges}`}</p>
    </>
  )
}

export default TypeaheadReactHook
