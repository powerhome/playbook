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
            <ProgressPills
                active={9}
                aria={{ label: '9 out of 18 steps complete' }}
                marginTop="md"
                steps={18}
                {...props}
            />
        </>
    )
}

export default ProgressPillsDefault
