import React from 'react'
import { Project } from '../../'

const ProjectDefault = () => (
  <div>
    <Project
        date={new Date('18 Nov 2019')}
        link="#"
        projectName="Jefferson-Smith"
        projectNumber="33-12345"
    />
    <Project
        date={new Date('18 Nov 2019')}
        projectName="Jefferson-Smith"
        projectNumber="33-12345"
    />
  </div>
)

export default ProjectDefault
