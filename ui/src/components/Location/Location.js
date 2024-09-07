import React, { useEffect, useState } from 'react'

import "./Location.css";
import { Input, Select } from 'antd';
import { countryList } from '../../utils/countries.js';
import postalCodes from "postal-codes-js"


const Location = (props) => {

    const { selectedVal, placeholder, optionFilterProp, handleCountry, pincode, handlePin } = props

    const [error, setError] = useState("")
    const [input, setInput] = useState("")

    const onChange = (value) => {

        if (handleCountry) {
            handleCountry(value)
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        handlePincodeChange(input)
    }, [input])

    useEffect(() => {
        if (pincode !== input) {
            setInput(pincode)
        }
    }, [pincode])

    const handlePincodeChange = (pin) => {


        const countryObj = countryList.find((c) => c.value == selectedVal)
        if (countryObj) {

            const result = postalCodes.validate(countryObj.code, pin)


            if (result !== true) {
                setError(result)
            } else {
                setError("")
                if (handlePin) {
                    handlePin(pin)
                }
            }
        }

    }


    return (
        <div className='NB-Basic-Info__location'>
            <h2>Country of Residence</h2>
            <div className='NB-Basic-Info__location__country'>
                <Select
                    size='large'
                    value={selectedVal}
                    showSearch
                    placeholder={placeholder}
                    optionFilterProp={optionFilterProp}
                    onChange={onChange}
                    // onSearch={onSearch}
                    options={countryList}
                />
                {selectedVal && (
                    <div className='NB-Basic-Info__location__pincode'>
                        <Input placeholder='Enter Pincode' onChange={handleInputChange} value={input} />
                        <div style={{ color: 'red' }}>{error}</div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Location;