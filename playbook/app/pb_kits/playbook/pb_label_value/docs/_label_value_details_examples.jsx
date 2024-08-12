import React from 'react'
import { Flex, LabelValue, Title } from 'playbook-ui'

const LabelValueDetailsExamples = (props) => {
  return (
    <div>
      <Title
          marginBottom="sm"
          size={4}
          text="Patient Profile"
          {...props}
      />

      <Flex>
        <Flex
            marginRight="lg"
            orientation="column"
            {...props}
        >
          <LabelValue
              icon="user"
              label="Age"
              paddingBottom="sm"
              title="24 yrs old"
              variant="details"
              {...props}
          />
          <LabelValue
              icon="weight"
              label="Weight"
              title="91 kg"
              variant="details"
              {...props}
          />
        </Flex>
        <Flex
            orientation="column"
            {...props}
        >
          <LabelValue
              icon="tint"
              label="Blood"
              paddingBottom="sm"
              title="A +"
              variant="details"
              {...props}
          />
          <LabelValue
              icon="arrows-v"
              label="Height"
              title="187 cm"
              variant="details"
              {...props}
          />
        </Flex>
      </Flex>

      <br />
      <br />
      <br />

      <Title
          marginBottom="sm"
          size={4}
          text="Workout Schedule"
          {...props}
      />

      <LabelValue
          active
          description="6 sets • 8 reps • 40-100 kg"
          icon="dumbbell"
          label="Chest"
          paddingBottom="sm"
          title="Bench Press"
          variant="details"
          {...props}
      />
      <LabelValue
          active
          description="5 sets • 12 reps • 20-40 kg"
          icon="dumbbell"
          label="Biceps"
          paddingBottom="sm"
          title="Barbell Curl"
          variant="details"
          {...props}
      />
      <LabelValue
          active
          description="8 sets • 8 reps • 40-120 kg"
          icon="dumbbell"
          label="Back"
          paddingBottom="sm"
          title="Back Squat"
          variant="details"
          {...props}
      />
    </div>
  )
}

export default LabelValueDetailsExamples
