import React from 'react'
import { Card } from 'antd'

import "./ClaimDeposit.css"
const ClaimDeposit = () => {
    return (
        <div className='NB-Claim-Deposit'>
            <Card title="" bordered={false} className='card-style  gradient-bg' style={{
                width: '100%',
                border: '2px solid #2D2C32',

            }}>
                <div className='title'>
                    <h2>Claim Deposit</h2>
                    <h2>$40</h2>
                </div>
                <p>The deposit amount is refundable on approval of claim and serves as a security for claim approval process</p>
            </Card>
        </div>
    )
}

export default ClaimDeposit