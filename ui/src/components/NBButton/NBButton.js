import React from 'react'
import { Button } from 'antd'

import "./NBButton.css"

const NBButton = (props) => {
    const { style = {}, btnStyle = {}, children, handleClick, disabled, loading, shape, classes, type, size } = props

    return (
        <span className='NB-Button btn-gradient-outer' style={{ ...style }}>
            <Button
                style={{ ...btnStyle }}
                onClick={handleClick}
                disabled={disabled}
                loading={loading}
                shape={shape} className={classes} type={type} size={size}>
                {children}
            </Button>
        </span>
    )
}

export default NBButton