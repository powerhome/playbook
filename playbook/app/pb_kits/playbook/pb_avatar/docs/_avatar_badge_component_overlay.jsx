import React from "react";
import { Avatar, Caption } from '../..'

const AvatarBadgeComponentOverlay = () => {
    return (
        <div>
            <Avatar
                componentOverlay={{
                    component: "iconCircle",
                    icon: "plus",
                    placement: "top-right"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="xl"
            />

            <Caption 
                marginBottom="sm" 
                text= "Badge"
            />
            <Avatar
                componentOverlay={{
                    component: "badge",
                    placement: "top-left",
                    text: "12"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="xxs"
            />

            <Avatar
                componentOverlay={{
                    component: "badge",
                    placement: "top-right",
                    text: "12"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="xs"
            />

            <Avatar
                componentOverlay={{
                    component: "badge",
                    placement: "bottom-right",
                    text: "12"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="sm"
            />

            <Avatar
                componentOverlay={{
                    component: "badge",
                    placement: "bottom-left",
                    text: "12"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="md"
            />

            <Avatar
                componentOverlay={{
                    component: "badge",
                    placement: "top-left",
                    text: "12"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="lg"
            />

            <Avatar
                componentOverlay={{
                    component: "badge",
                    placement: "top-right",
                    text: "12"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="xl"
            />    

        </div>
    )
}

export default AvatarBadgeComponentOverlay