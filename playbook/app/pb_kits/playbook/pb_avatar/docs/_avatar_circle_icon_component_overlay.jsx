import React from "react";
import Avatar from '../../pb_avatar/_avatar'

const AvatarCircleIconComponentOverlay = (props) => {
    return (
        <div>
        <Avatar
            componentOverlay={{
                component: "iconCircle",
                placement: "bottom-right",
                icon: "shield",
                variant: "royal"
            }}
            imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
            marginBottom="sm"
            size="sm"
            {...props}
        />

        <Avatar
            componentOverlay={{
                component: "iconCircle",
                placement: "bottom-right",
                icon: "check",
                variant: "green"
            }}
            imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
            marginBottom="sm"
            size="md"
            {...props}
        />

        <Avatar
            componentOverlay={{
                component: "iconCircle",
                placement: "top-left",
                icon: "lock",
                variant: "red"
            }}
            imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
            marginBottom="sm"
            size="lg"
            {...props}
        />

        <Avatar
            componentOverlay={{
                component: "iconCircle",
                placement: "left-center",
                icon: "star",
                variant: "yellow"
            }}
            imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
            marginBottom="sm"
            size="xl"
            {...props}
        />
    </div>
    )
}

export default AvatarCircleIconComponentOverlay
