import React from "react";
import { default as Avatar } from "../../pb_avatar/_avatar"

const AvatarBadgeComponentOverlay = (props) => {
    return (
        <div>
            <Avatar
                componentOverlay={{
                    component: "badge",
                    placement: "bottom-right",
                    text: "12",
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="sm"
                {...props}
            />

            <Avatar
                componentOverlay={{
                    component: "badge",
                    placement: "top-left",
                    text: "12"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="md"
                {...props}

            />

            <Avatar
                componentOverlay={{
                    component: "badge",
                    placement: "top-center",
                    text: "On Roadtip",
                    variant: "info"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="lg"
                {...props}

            />

            <Avatar
                componentOverlay={{
                    component: "badge",
                    placement: "bottom-center",
                    text: "Out of Office",
                    variant: "error"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="xl"
                {...props}
            />
        </div>
    )
}

export default AvatarBadgeComponentOverlay