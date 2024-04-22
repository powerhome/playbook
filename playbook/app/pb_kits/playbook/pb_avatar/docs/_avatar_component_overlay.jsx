import React from "react";
import { Avatar } from '../../'

const AvatarComponentOverlay = () => {
    return (
        <div>
            <Avatar
                componentOverlay={{
                    component: "iconCircle",
                    icon: "plus",
                    placement: "top-right"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                size="sm"
            />
        </div>
    )
}

export default AvatarComponentOverlay
