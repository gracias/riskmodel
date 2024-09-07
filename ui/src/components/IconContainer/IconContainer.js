import React from 'react'
import "./IconContainer.css"

const IconContainer = (props) => {
    const { children, outerStyle, outerWrapperStyle = {}, innerStyle, innerWrapperStyle = {} } = props
    return (
        <div className='NB-Icon-Container' style={{
            width: outerStyle.width, height: outerStyle.height,
            background: outerWrapperStyle.background
        }}>
            <div className="outer" style={{ ...outerStyle }}>
                <div className='inner-wrapper' style={{ background: innerWrapperStyle.background }}>
                    <div className='inner' style={{ ...innerStyle }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IconContainer