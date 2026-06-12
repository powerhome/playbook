import React from 'react'
import LoadingInline from '../_loading_inline'

const LoadingInlineColor = (props) => (
    <div>
        <LoadingInline 
            text=" Light" 
            {...props} 
        />
        
            <br/>

        <LoadingInline 
            color="default"
            text=" Default" 
            {...props} 
        />



        <br/>

        <LoadingInline 
            color="lighter"
            text=" Lighter" 
            {...props} 
        />

        <br/>

        <LoadingInline 
            color="link"
            text=" Link" 
            {...props} 
        />

        <br/>

        <LoadingInline 
            color="error"
            text=" Error" 
            {...props} 
        />

        <br/>

        <LoadingInline 
            color="success"
            text=" Success" 
            {...props} 
        />
    </div>
)

export default LoadingInlineColor