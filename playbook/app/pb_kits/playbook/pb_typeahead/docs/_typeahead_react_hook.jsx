import React from 'react'

import Typeahead from '../_typeahead'
import Title from '../../pb_title/_title'
import { useForm } from 'react-hook-form'

const languages = [
  { label: 'JavaScript', value: '1995', category: 'Web Development' },
  { label: 'Python', value: '1991', category: 'General Purpose' },
  { label: 'Java', value: '1995', category: 'Enterprise' },
  { label: 'C++', value: '1985', category: 'Systems Programming' },
  { label: 'Go', value: '2009', category: 'Systems Programming' },
  { label: 'Rust', value: '2010', category: 'Systems Programming' },
  { label: 'Swift', value: '2014', category: 'Mobile Development' },
  { label: 'Kotlin', value: '2011', category: 'Mobile Development' },
  { label: 'Ruby', value: '1995', category: 'General Purpose' },
  { label: 'PHP', value: '1995', category: 'Web Development' },
]

const colors = [
  { label: 'Orange', value: '#FFA500' },
  { label: 'Red', value: '#FF0000' },
  { label: 'Green', value: '#00FF00' },
  { label: 'Blue', value: '#0000FF' },
]

const TypeaheadReactHook = (props) => {
  const { register, watch } = useForm()

  const selectedLanguages = watch('languages')
  const selectedColor = watch('color')

  return (
    <>
      <Typeahead
          isMulti
          label="Multi Select Languages"
          multiKit="language"
          options={languages}
          {...props}
          {...register('languages')}
      />
      <Title 
          size={4} 
          text='Selected Languages' 
      />
      {selectedLanguages && selectedLanguages.map(language => (
        <p key={language.label}>{`${language.label} - ${language.value} - ${language.category}`}</p>
      ))}

      <Typeahead
          label="Colors"
          marginTop="lg"
          options={colors}
          {...props}
          {...register('color')}
      />
      <Title 
          size={4} 
          text='Selected Color' 
      />
      <p>{ selectedColor && `${selectedColor.label} - ${selectedColor.value}`}</p>
    </>
  )
}

export default TypeaheadReactHook
