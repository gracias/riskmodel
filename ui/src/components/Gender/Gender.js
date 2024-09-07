import React from 'react'
import { Radio } from 'antd';

const Gender = (props) => {

    const { handleGender, gender, defaultValue } = props


    const onChange = (e) => {

        if (handleGender) {
            handleGender(e.target.value)
        }
    }
    return (
        <div className='NB-Basic-Info__gender'>
            <h2>What is your gender?</h2>

            <div>
                <Radio.Group size='large' buttonStyle='solid' onChange={onChange} defaultValue={defaultValue} value={gender}>
                    <Radio.Button value="male">Male</Radio.Button>
                    <Radio.Button value="female">Female</Radio.Button>
                    <Radio.Button value="other">Other</Radio.Button>

                </Radio.Group>
            </div>
        </div>
    )
}

export default Gender