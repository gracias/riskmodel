import React from 'react'
import { Card, Button } from "antd"

import "./TransactionDetails.css"
import { useNavigate } from 'react-router-dom'
import NBButton from '../NBButton/NBButton.js'

const TransactionDetails = ({ width }) => {

    const navigate = useNavigate()

    const handleViewDashboard = () => {
        navigate("/policies")
    }
    const handleViewPolicy = () => {
        navigate("/policies")
    }
    return (
        <div className='NB-TransactionDetails'>
            <Card title="Transaction Details" bordered={false} className='card-style gradient-bg' style={{ width, border: '2px solid #2D2C32' }}>
                <div className='NB-TransactionDetails__content'>
                    <div className='NB-TransactionDetails__content__row'>
                        <div className='col-1'>Transaction Details</div><div className='col-2'>View Summary</div>
                    </div>
                    <div className='NB-TransactionDetails__content__row'>
                        <div className='col-1'>Status</div>
                        <div className='col-2' style={{ color: 'green', display: 'flex' }}>
                            <div className='dot'></div> <div>Success</div></div>
                    </div>
                    <div className='NB-TransactionDetails__action'>
                        <NBButton
                            classes="dashboard"
                            style={{ marginRight: '1.5rem' }}
                            shape='round' size='large' type='default' handleClick={handleViewDashboard}
                        >
                            Dashboard
                        </NBButton>
                        <NBButton classes="viewpolicy btn-gradient" shape='round' size='large' type='primary'
                            handleClick={handleViewPolicy}>View Policy</NBButton>

                    </div>
                </div>
            </Card>
        </div>
    )
}

export default TransactionDetails