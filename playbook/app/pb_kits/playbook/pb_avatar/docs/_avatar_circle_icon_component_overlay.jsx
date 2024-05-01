import React from "react";
import { Avatar, Caption } from '../..'

const AvatarCircleIconComponentOverlay = () => {
    return (
        <div>
            <Caption 
                marginBottom="sm" 
                text= "Circle Icon"
            />
            <Avatar
                componentOverlay={{
                    component: "iconCircle",
                    icon: "plus",
                    placement: "top-left"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="xxs"
            />

            <Avatar
                componentOverlay={{
                    component: "iconCircle",
                    icon: "plus",
                    placement: "top-right"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="xs"
            />

            <Avatar
                componentOverlay={{
                    component: "iconCircle",
                    icon: "plus",
                    placement: "bottom-right"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="sm"
            />

            <Avatar
                componentOverlay={{
                    component: "iconCircle",
                    icon: "plus",
                    placement: "bottom-left"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="md"
            />

            <Avatar
                componentOverlay={{
                    component: "iconCircle",
                    icon: "plus",
                    placement: "top-left"
                }}
                imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
                marginBottom="sm"
                size="lg"
            />

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

        </div>
    )
}

export default AvatarCircleIconComponentOverlay
