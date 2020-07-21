import React from 'react'
import { Flex, LabelValue, Title } from '../../'

const LabelValueDetailsExamples = () => {
  return (
    <div>
      <Title
          marginBottom="sm"
          size={4}
          text="Patient Profile"
      />

      <Flex>
        <Flex
            marginRight="lg"
            orientation="column"
        >
          <LabelValue
              icon="user"
              label="Age"
              paddingBottom="sm"
              title="24 yrs old"
              variant="details"
          />
          <LabelValue
              icon="weight"
              label="Weight"
              title="91 kg"
              variant="details"
          />
        </Flex>
        <Flex
            orientation="column"
        >
          <LabelValue
              icon="tint"
              label="Blood"
              paddingBottom="sm"
              title="A +"
              variant="details"
          />
          <LabelValue
              icon="arrows-v"
              label="Height"
              title="187 cm"
              variant="details"
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
      />

      <LabelValue
          description="6 sets • 8 reps • 40-100 kg"
          icon="dumbbell"
          label="Chest"
          link="#"
          paddingBottom="sm"
          title="Bench Press"
          variant="details"
      />
      <LabelValue
          description="5 sets • 12 reps • 20-40 kg"
          icon="dumbbell"
          label="Biceps"
          link="#"
          paddingBottom="sm"
          title="Barbell Curl"
          variant="details"
      />
      <LabelValue
          description="8 sets • 8 reps • 40-120 kg"
          icon="dumbbell"
          label="Back"
          link="#"
          paddingBottom="sm"
          title="Back Squat"
          variant="details"
      />
    </div>
  )
}

export default LabelValueDetailsExamples
