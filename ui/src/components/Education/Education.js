import React from 'react'
import { Select } from 'antd';

import "./Education.css";
import { educationQualification } from '../../utils/education.js';

const Education = (props) => {

    const { education, placeholder, handleEducation, optionFilterProp } = props;

    const onChange = (value) => {
        if (handleEducation) {
            handleEducation(value)
        }
    }

    return (
        <div className='NB-Basic-Info__education'>
            <h2>Education Qualification</h2>
            <div className='NB-Basic-Info__education__select'>
                <Select
                    size='large'
                    value={education}
                    optionFilterProp={optionFilterProp}
                    showSearch
                    placeholder={placeholder}
                    onChange={onChange}
                    options={educationQualification}
                />
            </div>
        </div>
    )
}

export default Education