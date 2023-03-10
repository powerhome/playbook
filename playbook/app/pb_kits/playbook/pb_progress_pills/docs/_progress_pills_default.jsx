import React from 'react'
import ProgressPills from '../_progress_pills'

const ProgressPillsDefault = (props) => {
    return (
        <>
            <ProgressPills
                active={2}
                aria={{ label: '2 out of 3 steps complete' }}
                steps={3}
                {...props}
            />
        </>
    )
}

export default ProgressPillsDefault
