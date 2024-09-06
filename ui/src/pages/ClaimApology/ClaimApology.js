import React from 'react';
import ClaimApologyHeader from '../../components/ClaimApologyHeader/ClaimApologyHeader.js';

import { Button, Col, Row } from 'antd';
import ClaimInsuranceItem from '../../components/ClaimInsuranceItem/ClaimInsuranceItem.js';
import ClaimSteps from '../../components/ClaimSteps/ClaimSteps.js';
import "./ClaimApology.css";
import { useNavigate } from 'react-router-dom';
import NBButton from '../../components/NBButton/NBButton.js';


const ClaimApology = () => {
    const navigate = useNavigate()

    const handleCancel = () => {
        navigate("/policies")
    }

    const handleClaimInsurance = () => {
        navigate("/claim-processing")
    }

    return (
        <div className='NB-Claim-Apology'>

            <div className='header'>
                <ClaimApologyHeader />
            </div>

            <Row align={"stretch"}>
                <Col span={16}>
                    <div className='product'>
                        <ClaimInsuranceItem />
                    </div>
                    <div className='apology-text'>
                        {/* Please provide us with relationship proof of you with your loved one */}
                    </div>
                </Col>

                <Col span={8}>
                    <div className='steps'>
                        <ClaimSteps />
                    </div>
                </Col>
            </Row>
            <Row align={"stretch"}>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <div className='actions'>
                        <NBButton
                            handleClick={handleCancel}
                            style={{ marginRight: '1.5rem' }}
                            type="default" shape='round' classes='NB-Claim-Apology__actions__cancel' size="large">Cancel</NBButton>
                        <NBButton
                            handleClick={handleClaimInsurance}

                            shape='round' classes='NB-Claim-Apology__actions__next btn-gradient' type="primary" size="large">
                            Claim Insurance
                        </NBButton>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ClaimApology