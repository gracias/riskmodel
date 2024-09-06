import { Select } from 'antd';
import React from 'react';
import { jobList } from '../../utils/jobs.js';

import "./Occupation.css";

const Occupation = (props) => {

    const { occupation, placeholder, handleOccupation, optionFilterProp } = props;

    const onChange = (value) => {
        if (handleOccupation) {
            handleOccupation(value)
        }
    }

    return (
        <div className='NB-Basic-Info__occupation'>
            <h2>What is your occupation?</h2>
            <div className='NB-Basic-Info__occupation__input'>
                <Select
                    size='large'
                    value={occupation}
                    optionFilterProp={optionFilterProp}
                    showSearch
                    placeholder={placeholder}
                    onChange={onChange}
                    options={jobList}
                />
            </div>

        </div>
    )
}

export default Occupation