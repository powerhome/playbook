import React from 'react'
import { useForm } from 'react-hook-form'
import { FileUpload, Card, Body, Button } from '../..'

const FileUploadFormExample = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      profilePicture: null,
      documents: null,
    }
  })

  const onSubmit = (data) => {
    console.log('Form submitted:', data)
  }

  // Watch form values for real-time display
  const formValues = watch()

  const handleFilesAccepted = (fieldName) => (files) => {
    setValue(fieldName, files[0])
  }

  const handleFilesRejected = (error, files) => {
    console.error('Files rejected:', error, files)
  }

  return (
    <div>
      <Card padding="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Image Upload with validation */}
          <div>
            <Body
                marginBottom="xs"
                text="Profile Picture"
            />
            <FileUpload
                accept={['image/jpeg', 'image/png']}
                acceptedFilesDescription="JPEG, PNG"
                maxSize={5000000} // 5MB
                name="profilePicture"
                onFilesAccepted={handleFilesAccepted('profilePicture')}
                onFilesRejected={handleFilesRejected}
                register={register}
                rules={{
                  required: 'Please upload a profile picture',
                }}
            />
            {errors.profilePicture && (
              <Body
                  marginTop="xs"
                  status="negative"
                  text={errors.profilePicture.message}
              />
            )}
          </div>

          {/* Document Upload */}
          <div className="mt-4">
            <Body
                marginBottom="xs"
                text="Supporting Documents"
            />
            <FileUpload
                accept={['.pdf', '.doc', '.docx']}
                acceptedFilesDescription="PDF, DOC, DOCX"
                maxSize={10000000} // 10MB
                name="documents"
                onFilesAccepted={handleFilesAccepted('documents')}
                onFilesRejected={handleFilesRejected}
                register={register}
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
            {JSON.stringify(
              {
                profilePicture: formValues.profilePicture?.name,
                documents: formValues.documents?.name,
              },
              null,
              2
            )}
          </pre>
        </Card>
      </Card>
    </div>
  )
}

FileUploadFormExample.title = 'React Hook Form Integration'
FileUploadFormExample.description = `
This example demonstrates how to use the FileUpload component with React Hook Form.
The integration provides:
- Direct form state management
- Built-in validation
- File type restrictions
- File size limits
- Error handling
- No need for Controller wrapper

Example usage:
\`\`\`jsx
const { register, setValue } = useForm()

const handleFilesAccepted = (files) => {
  setValue('profilePicture', files[0])
}

<FileUpload
  name="profilePicture"
  accept={['image/jpeg', 'image/png']}
  maxSize={5000000}
  register={register}
  rules={{ required: 'Please upload a file' }}
  onFilesAccepted={handleFilesAccepted}
/>
\`\`\`
`

export default FileUploadFormExample 