import React from 'react'
import IconContainer from '../IconContainer/IconContainer.js'

import "./TitleHeader.css"

const TitleHeader = ({ Icon, title, description, iconClassName, outerIconStyle, innerIconStyle }) => {
    return (
        <div className='Title__header'>
            <IconContainer
                innerStyle={innerIconStyle}
                outerStyle={outerIconStyle}>
                <Icon className={iconClassName} />
            </IconContainer>
            <div className='text'>
                <div className='title'>{title}</div>
                <div className='subtitle'>{description}</div>
            </div>
        </div>
    )
}

export default TitleHeader