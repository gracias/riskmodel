import React from 'react'

import "./ContentTile.css"

const ContentTile = (props) => {
    const { title, value, titleWidth } = props
    return (
        <div className='NB-Content-Tile'>
            <div className='NB-Tile'>
                <div style={{ width: titleWidth ? titleWidth : '' }} className='tag-title'>
                    {title}
                </div>
                <div className='tag-val'>
                    {value}
                </div>
            </div>
        </div>
    )
}

export default ContentTile