import React, { useState } from 'react'
import { Button } from 'antd'
import ClaimInsuranceItem from '../../components/ClaimInsuranceItem/ClaimInsuranceItem.js'
import ClaimDeposit from '../../components/ClaimDeposit/ClaimDeposit.js'

import "./ClaimProcessingFee.css"
import ClaimTracker from '../../components/ClaimTracker/ClaimTracker.js'
import { useNavigate } from 'react-router-dom'
import ClaimIntiationSuccessHeader from '../../components/ClaimIntiationSuccessHeader/ClaimIntiationSuccessHeader.js'
import NBButton from '../../components/NBButton/NBButton.js'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const ClaimProcessingFee = () => {
    const navigate = useNavigate()
    const [depositSuccess, setDepositSuccess] = useState(false)
    const [isPaying, setIsPaying] = useState(false)

    const handleCancel = () => {
        navigate("/policies")
    }

    const handlePaymentDeposit = async () => {
        if (isPaying) return
        setIsPaying(true)
        try {
            await sleep(2000)
            setDepositSuccess(true)
            setIsPaying(false)
        } catch (err) {
            setIsPaying(false)
        }
    }

    const handleGoToDashboard = () => {
        navigate("/policies")
    }
    const handleViewClaim = () => {
        // TODO: in props get claim idand navigate to claim 
        navigate("/claims")
    }
    return (
        <>
            {!depositSuccess ? (
                <div className='NB-Claim-Processing-Fees'>
                    <h1>Claim Processing Fees</h1>
                    <ClaimInsuranceItem />
                    <div className='claim-deposit'>
                        <ClaimDeposit />
                    </div>
                    <div className='actions'>
                        <NBButton
                            handleClick={handleCancel}
                            disabled={isPaying}
                            style={{ marginRight: '1.5rem' }}
                            type="default" shape='round' classes='NB-Claim-Processing-Fees__actions__cancel' size="large">Cancel</NBButton>
                        <NBButton
                            handleClick={handlePaymentDeposit}
                            disabled={isPaying}
                            loading={isPaying}
                            shape='round' classes='NB-Claim-Processing-Fees__actions__next btn-gradient' type="primary" size="large">
                            Proceed to pay
                        </NBButton>
                    </div>

                </div>
            ) : (
                <div className='NB-Claim-Processing-Fees'>
                    <ClaimIntiationSuccessHeader />
                    <div className='tracker'>
                        <ClaimTracker />
                    </div>
                    <div className='actions'>
                        <span className='btn-wrapper mr-2'>
                            <NBButton
                                handleClick={handleGoToDashboard}
                                style={{}}
                                disabled={isPaying}
                                type="default" shape='round' classes='NB-Claim-Processing-Fees__actions__cancel' size="large">
                                Go to dashboard</NBButton>
                        </span>
                        <span className='btn-wrapper'>
                            <NBButton
                                handleClick={handleViewClaim}
                                disabled={isPaying}
                                loading={isPaying}
                                shape='round' classes='NB-Claim-Processing-Fees__actions__next btn-gradient' type="primary" size="large">
                                View Claim
                            </NBButton>
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}

export default ClaimProcessingFee