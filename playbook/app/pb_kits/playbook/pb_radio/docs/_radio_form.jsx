import React from 'react'
import { useForm } from 'react-hook-form'
import { Radio, Card, Body, Button } from 'playbook-ui'

const RadioForm = () => {
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

  const formValues = watch()

  return (
    <div>
      <Card padding="md">
        <form onSubmit={handleSubmit(onSubmit)}>
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
              htmlType="submit"
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
          <pre style={{ marginTop: '8px', color: "white" }}>
            {JSON.stringify(formValues, null, 2)}
          </pre>
        </Card>
      </Card>
    </div>
  )
}

export default RadioForm