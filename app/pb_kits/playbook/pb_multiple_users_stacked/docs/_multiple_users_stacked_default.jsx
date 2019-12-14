import React from "react"
import {MultipleUsersStacked} from "../../"

function MultipleUsersStackedDefault() {
  return (
    <div>
      <MultipleUsersStacked users={[
        {
          name: "Patrick Welch",
          image_url: "https://randomuser.me/api/portraits/men/9.jpg",
        },
        {
          name: "Lucille Sanchez",
          image_url: "https://randomuser.me/api/portraits/women/6.jpg",
        },
        {
          name: "Beverly Reyes",
          image_url: "https://randomuser.me/api/portraits/women/74.jpg",
        },
        {
          name: "Keith Craig",
          image_url: "https://randomuser.me/api/portraits/men/40.jpg",
        },
        {
          name: "Alicia Cooper",
          image_url: "https://randomuser.me/api/portraits/women/46.jpg",
        }
      ]} />
<br/>
      <MultipleUsersStacked users={[
        {
          name: "Patrick Welch",
          image_url: "https://randomuser.me/api/portraits/men/9.jpg",
        },
        {
          name: "Lucille Sanchez",
          image_url: "https://randomuser.me/api/portraits/women/6.jpg",
        }
      ]} />
    </div>
  )
}

export default MultipleUsersStackedDefault
