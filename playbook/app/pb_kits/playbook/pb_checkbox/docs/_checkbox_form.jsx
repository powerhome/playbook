import React from "react"
import { useForm } from "react-hook-form"
import { Checkbox, Card, Body, Button } from "playbook-ui"

const CheckboxForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      termsAccepted: false,
      newsletter: false,
      interests: [],
      preferences: {
        emailUpdates: false,
        smsUpdates: false,
        pushNotifications: false,
      },
    },
  })

  const onSubmit = (data) => {
    console.log("Form submitted:", data)
  }

  const formValues = watch()

  return (
    <div>
      <Card padding='md'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Body marginBottom='xs'
                text='Terms and Conditions'
            />
            <Checkbox
                error={errors.termsAccepted?.message}
                name='termsAccepted'
                register={register}
                rules={{
                required: "You must accept the terms and conditions",
              }}
                text='I accept the terms and conditions'
            />
          </div>
          <div className='mt-4'>
            <Body marginBottom='xs'
                text='Newsletter Subscription'
            />
            <Checkbox
                name='newsletter'
                register={register}
                text='Subscribe to our newsletter'
            />
          </div>
          <div className='mt-4'>
            <Body marginBottom='xs'
                text='Your Interests'
            />
            <Checkbox
                error={errors.interests?.message}
                name='interests'
                register={register}
                rules={{
                validate: (value) => {
                  const selectedInterests = Object.values(value).filter(Boolean)
                  return (
                    selectedInterests.length >= 1 ||
                    "Please select at least one interest"
                  )
                },
              }}
                text='Technology'
                value='technology'
            />
            <Checkbox
                name='interests'
                register={register}
                text='Design'
                value='design'
            />
            <Checkbox
                name='interests'
                register={register}
                text='Business'
                value='business'
            />
            <Checkbox
                name='interests'
                register={register}
                text='Marketing'
                value='marketing'
            />
          </div>
          <div className='mt-4'>
            <Body marginBottom='xs'
                text='Communication Preferences'
            />
            <Checkbox
                name='preferences.emailUpdates'
                register={register}
                text='Email Updates'
            />
            <Checkbox
                name='preferences.smsUpdates'
                register={register}
                text='SMS Updates'
            />
            <Checkbox
                name='preferences.pushNotifications'
                register={register}
                text='Push Notifications'
            />
          </div>
          <Button
              htmlType="submit"
              marginTop='lg'
              text='Submit'
              type='submit'
              variant='primary'
          />
        </form>
        <Card marginTop='lg'>
          <Body text='Current Form Values:'
              variant='bold'
          />
          <pre style={{ marginTop: "8px", color: "white" }}>
            {JSON.stringify(formValues, null, 2)}
          </pre>
        </Card>
      </Card>
    </div>
  )
}

export default CheckboxForm
