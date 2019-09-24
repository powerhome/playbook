import React from "react"
import Project from "../_project.jsx"

function ProjectDefault() {
  return (
    <div>
      <Project projectNumber="33-01023" ownerName="Jefferson-Smith" link="#" date="11/18" />
      <br />
      <Project projectNumber="33-01023" ownerName="Jefferson-Smith" date="11/18" />
      <br />
      <Project projectNumber="33-01023" ownerName="Jefferson-Smith" />
      <br />
      <Project projectNumber="33-01023" ownerName="Jefferson-Smith" link="#" />
    </div>
  )
}

export default ProjectDefault;
