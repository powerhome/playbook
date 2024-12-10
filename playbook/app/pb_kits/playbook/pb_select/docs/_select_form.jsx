import React from 'react'
import { useForm } from 'react-hook-form'
import { Select, Card, Body, Button } from 'playbook-ui'

const SelectForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      favoriteFood: '',
      mealType: '',
      dietaryRestrictions: '',
    }
  })

  const onSubmit = (data) => {
    console.log('Form submitted:', data)
  }

  // Watch form values for real-time display
  const formValues = watch()

  const foodOptions = [
    { value: 'pizza', text: 'Pizza' },
    { value: 'burger', text: 'Burger' },
    { value: 'sushi', text: 'Sushi' },
    { value: 'salad', text: 'Salad' },
  ]

  const mealTypes = [
    { value: 'breakfast', text: 'Breakfast' },
    { value: 'lunch', text: 'Lunch' },
    { value: 'dinner', text: 'Dinner' },
  ]

  const dietaryOptions = [
    { value: 'none', text: 'No Restrictions' },
    { value: 'vegetarian', text: 'Vegetarian' },
    { value: 'vegan', text: 'Vegan' },
    { value: 'glutenFree', text: 'Gluten Free' },
  ]

  return (
    <div>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select
              error={errors.favoriteFood?.message}
              label="What's your favorite food?"
              name="favoriteFood"
              options={foodOptions}
              register={register}
              rules={{
                required: 'Please select your favorite food',
              }}
              {...props}
          />
          <Select
              blankSelection="Choose a meal type..."
              error={errors.mealType?.message}
              label="Preferred meal time"
              marginTop="md"
              name="mealType"
              options={mealTypes}
              register={register}
              rules={{
                required: 'Please select a meal type',
              }}
              {...props}
          />
          <Select
              label="Dietary Restrictions"
              marginTop="md"
              name="dietaryRestrictions"
              options={dietaryOptions}
              register={register}
              {...props}
          />

          <Button
              htmlType="submit"
              marginTop="lg"
              text="Submit"
              type="submit"
              variant="primary"
              
          />
        </form>
        <Card marginTop="lg">
          <Body
              text="Current Form Values:"
              variant="bold"
          />
          <pre style={{ marginTop: '8px', color: "white" }}>
            {JSON.stringify(formValues, null, 2)}
          </pre>
        </Card>
      </Card>
    </div>
  )
}

export default SelectForm



