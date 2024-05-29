import React from 'react'
import { GradientOverlay, Body, Title } from '../../'

const GradientOverlayDefault = () => (
    <>
        <Title paddingBottom="xl"
            size="4"
            text="Example 1" />
        <GradientOverlay
            direction="left"
            end="100%"
            gradientColors={["transparent", "white"]}
            start="0%"
        >
            <Title text="Welcome to Playbook" />
        </GradientOverlay>
        <Title paddingY="xl"
            size="4"
            text="Example 2" />
        <GradientOverlay
            direction="bottom"
            end="100%"
            gradientColors={["transparent", "white"]}
            start="20%"
        >
            <Body text="Welcome to Playbook. This is a full paragraph of information. Blah. Blah. A vertically stacked set of interactive headings that each reveal a section of content. A vertically stacked set of interactive headings that each reveal a section of content. Welcome to Playbook. This is a full paragraph of information. Blah. Blah. A vertically stacked set of interactive headings that each reveal a section of content. A vertically stacked set of interactive headings that each reveal a section of content." />
        </GradientOverlay>
    </>
)

export default GradientOverlayDefault
