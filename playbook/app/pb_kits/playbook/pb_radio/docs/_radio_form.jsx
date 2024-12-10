import React from 'react'
import { useForm } from 'react-hook-form'
import { Radio, Card, Body, Button } from '../..'

const RadioFormExample = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      preferredContact: '',
      availability: '',
      notifications: '',
    }
  })

  const onSubmit = (data) => {
    console.log('Form submitted:', data)
  }

  // Watch form values for real-time display
  const formValues = watch()

  return (
    <div>
      <Card padding="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Basic Radio with validation */}
          <div>
            <Body
                marginBottom="xs"
                text="Preferred Contact Method"
            />
            <Radio
                error={errors.preferredContact?.message}
                label="Email"
                name="preferredContact"
                register={register}
                rules={{
                  required: 'Please select a contact method',
                }}
                value="email"
            />
            <Radio
                label="Phone"
                name="preferredContact"
                register={register}
                rules={{
                  required: 'Please select a contact method',
                }}
                value="phone"
            />
            <Radio
                label="Text Message"
                name="preferredContact"
                register={register}
                rules={{
                  required: 'Please select a contact method',
                }}
                value="text"
            />
          </div>

          {/* Radio group with custom validation */}
          <div className="mt-4">
            <Body
                marginBottom="xs"
                text="Availability"
            />
            <Radio
                error={errors.availability?.message}
                label="Weekdays"
                name="availability"
                register={register}
                rules={{
                  required: 'Please select your availability',
                }}
                value="weekdays"
            />
            <Radio
                label="Weekends"
                name="availability"
                register={register}
                rules={{
                  required: 'Please select your availability',
                }}
                value="weekends"
            />
            <Radio
                label="Any time"
                name="availability"
                register={register}
                rules={{
                  required: 'Please select your availability',
                }}
                value="anytime"
            />
          </div>

          {/* Optional Radio group */}
          <div className="mt-4">
            <Body
                marginBottom="xs"
                text="Notification Preferences"
            />
            <Radio
                label="All notifications"
                name="notifications"
                register={register}
                value="all"
            />
            <Radio
                label="Important only"
                name="notifications"
                register={register}
                value="important"
            />
            <Radio
                label="None"
                name="notifications"
                register={register}
                value="none"
            />
          </div>

          <Button
              marginTop="lg"
              text="Submit"
              type="submit"
              variant="primary"
          />
        </form>

        {/* Display form values for demonstration */}
        <Card marginTop="lg">
          <Body
              text="Current Form Values:"
              variant="bold"
          />
          <pre style={{ marginTop: '8px' }}>
            {JSON.stringify(formValues, null, 2)}
          </pre>
        </Card>
      </Card>
    </div>
  )
}

RadioFormExample.title = 'React Hook Form Integration'
RadioFormExample.description = `
This example demonstrates how to use the Radio component with React Hook Form.
The integration provides:
- Direct form state management
- Built-in validation
- Error handling
- No need for Controller wrapper
- Support for radio groups

Example usage:
\`\`\`jsx
const { register } = useForm()

<Radio
  name="contact"
  label="Email"
  value="email"
  register={register}
  rules={{
    required: 'Please select a contact method'
  }}
  error={errors.contact?.message}
/>
\`\`\`
`

export default RadioFormExample 