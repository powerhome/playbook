import React, { useRef, useEffect, useState } from 'react';
import { OverlayChildrenProps } from '../_overlay';

const previousOverlayDirectionMap: { [key: string]: string } = {
    "x": "left",
    "y": "top",
}

const subsequentOverlayDirectionMap: { [key: string]: string } = {
    "x": "right",
    "y": "bottom",
}

const OverlayToken = (props: OverlayChildrenProps) => {
    const {
        children,
        color,
        dynamic,
        position,
        size,
    } = props

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);


    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            const atStart = scrollLeft === 0;
            const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;

            setIsAtStart(atStart);
            setIsAtEnd(atEnd);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll();
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    const hasSubsequentOverlay = position === "x" || position === "y";

    const getPreviousOverlayDirection = () => {
        return hasSubsequentOverlay ? previousOverlayDirectionMap[position] : position
    }

    const getSubsequentOverlayDirection = () => {
        return hasSubsequentOverlay ? subsequentOverlayDirectionMap[position] : position
    }

    const previousOverlayClassName = `overlay_${color}_${getPreviousOverlayDirection()}_${size}`
    const subsequentOverlayClassName = `overlay_${color}_${getSubsequentOverlayDirection()}_${size}`

    return (
        <>
            <div className={dynamic ? isAtStart ? '' : previousOverlayClassName : previousOverlayClassName} />
            {dynamic ?
                <div
                    className="overlay_token_container"
                    ref={scrollContainerRef}
                    style={{
                        overflowX: 'auto',
                    }}
                >
                    {children}
                </div>
                :
                    children
                }
            {hasSubsequentOverlay &&
                <div className={dynamic ? isAtEnd ? '' : subsequentOverlayClassName : subsequentOverlayClassName} />
            }
        </>
    )
}

export default OverlayToken;
