import React, { useState } from 'react'
import { Slider } from 'antd';

import "./Age.css"

const formatter = (value) => <span style={{ color: 'black', fontWeight: 'bold' }}>{value}</span>

const Age = (props) => {

    const { age, handleAge, defaultValue, min, max, step } = props

    const [value, setValue] = useState(age)


    const onChangeComplete = (value) => {
       
        if (handleAge) {
            handleAge(value)
        }
    };
    const onChange = (value) => {
       
        setValue(value)
    };
    return (
        <div className='NB-Basic-Info__age'>
            <h2>How old are you?</h2>
            <div className='NB-Basic-Info__age__slider'>
                <Slider
                    max={max}
                    min={min}
                    step={step}
                    defaultValue={defaultValue}
                    tooltip={{
                        formatter,
                    }}
                    value={value}
                    onChange={onChange}
                    onChangeComplete={onChangeComplete}
                />
            </div>

        </div>
    )
}

export default Age