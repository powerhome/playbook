import React from 'react'
import ProgressPills from '../_progress_pills'

const ProgressPillsFullWidth = (props) => {
    return (
        <>
            <ProgressPills
                active={2}
                aria={{ label: '2 out of 5 steps complete' }}
                fullWidthPill
                steps={5}
                {...props}
            />
        </>
    )
}

export default ProgressPillsFullWidth
