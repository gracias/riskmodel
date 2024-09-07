import { Input } from 'antd';
import React from 'react';
import { DollarOutlined } from '@ant-design/icons';


import "./MonthlyIncome.css";

const MonthlyIncome = (props) => {

    const { income, placeholder, handleIncome } = props;

    const onChange = (e) => {
        if (handleIncome) {
            handleIncome(e.target.value)
        }
    }



    return (
        <div className='NB-Basic-Info__monthlyIncome'>
            <h2>Monthly Income</h2>
            <div className='NB-Basic-Info__monthlyIncome__input'>
                <Input


                    style={{ fontSize: '1.5rem', width: '70%' }}
                    prefix={<DollarOutlined size={'large'} style={{ color: 'rgba(255,255,255)', fontSize: '1.5rem' }} />}
                    placeholder={placeholder} onChange={onChange} value={income} />
            </div>

        </div>
    )
}

export default MonthlyIncome