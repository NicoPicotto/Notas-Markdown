import React from 'react'
import Markdown from "react-remarkable"

const Preview = ({text}) => {
    return (
        <div className="preview">
            <Markdown source={text} />
        </div>
    )
}

export default Preview
