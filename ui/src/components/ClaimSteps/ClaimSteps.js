import React from 'react'
import { Card, Steps } from 'antd'

import "./ClaimSteps.css"

const DollarIcon = () => {
    return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 6.5H12.75C13.9926 6.5 15 7.50736 15 8.75C15 9.99264 13.9926 11 12.75 11H8.5H13.25C14.4926 11 15.5 12.0074 15.5 13.25C15.5 14.4926 14.4926 15.5 13.25 15.5H8.5M8.5 6.5H7M8.5 6.5V15.5M8.5 15.5H7M9 5V6.5M9 15.5V17M12 5V6.5M12 15.5V17M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

const DepositIcon = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 10H2M2 8.2L2 15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19L18.8 19C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5L5.2 5C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

const UploadIcon = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V15M17 8L12 3M12 3L7 8M12 3V15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}
const steps = [
    {
        key: '1',
        title: 'Step 1',
        description: 'Upload necessary documents for your claim',
        icon: <UploadIcon />
    },
    {
        key: '2',
        title: 'Step 2',
        description: 'Pay a claim processing fee. This is refunded if claim is successful',
        icon: <DepositIcon />
    },
    {
        key: '3',
        title: 'Step 3',
        description: 'Get your claim deposited in your wallet',
        icon: <DollarIcon />
    }
]

const ClaimSteps = () => {
    return (
        <div className='NB-Claim-Steps'>
            <Card title="Claim in 3 simple steps" className='gradient-bg'
                bordered={false} style={{ width: '100%', border: '2px solid #2D2C32' }}>
                <Steps
                    direction="vertical"
                    current={-1}
                    items={steps}
                />

            </Card>
        </div>
    )
}

export default ClaimSteps