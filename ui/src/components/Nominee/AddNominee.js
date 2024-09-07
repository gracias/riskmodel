import React, { useState, useEffect, useContext } from 'react'
import { Select, Input, Card } from 'antd';
import { isAddress } from "ethereum-address"

import { relationshipList } from '../../utils/relationship.js';
import { BasicDetailsContext } from '../../pages/Details/BasicDetails.js'

import "./AddNominee.css";

const AddNominee = () => {
    const { details, setDetails } = useContext(BasicDetailsContext);
    const [error, setError] = useState("")

    const handleRelationship = (value) => {
        setDetails({ ...details, nominee: { ...details.nominee, relationship: value } })
    }

    const handleWalletAddress = (value) => {
        setDetails({ ...details, nominee: { ...details.nominee, address: value } })
    }




    const validateWalletAddress = (e) => {
        //validate address
        handleWalletAddress(e.target.value)
        if (isAddress(e.target.value)) {
            setError("")

        }
        else {
            setError("Enter a valid wallet address")

        }
    }
    return (
        <div className='NB-Add-Nominee gradient-bg-outer'>
            <Card title="Nominee Details" bordered={false} className='card-style gradient-bg'>
                <div className='NB-Add-Nominee__fields'>
                    <div className='NB-Add-Nominee__relationship'>
                        <Select
                            size='large'
                            value={details.nominee.relationship}
                            optionFilterProp={"value"}
                            showSearch
                            placeholder={"Select Relationship"}
                            onChange={handleRelationship}
                            options={relationshipList}
                        />
                    </div>
                    <div className='NB-Add-Nominee__address'>
                        <Input placeholder='Nominee Wallet Address' onChange={validateWalletAddress} value={details.nominee.address} />
                        <div style={{ color: 'red' }}>{error}</div>
                    </div>
                </div>

            </Card>

        </div>
    )
}

export default AddNominee