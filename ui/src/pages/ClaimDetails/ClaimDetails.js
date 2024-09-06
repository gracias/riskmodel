import React from 'react'

import "./ClaimDetails.css"
import InsuranceItem from '../../components/InsuranceItem/InsuranceItem.js'
import ClaimStatusGrid from '../../components/ClaimStatusGrid/ClaimStatusGrid.js'

const ClaimDetails = () => {
    return (
        <div className='NB-Claim-Details'>
            <InsuranceItem withClaimTracker={true} noBorder={true} />
            <div className='status-details'>
                <ClaimStatusGrid />
            </div>
        </div>
    )
}

export default ClaimDetails