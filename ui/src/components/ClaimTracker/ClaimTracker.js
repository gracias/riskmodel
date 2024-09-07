import React, { useEffect, useState } from 'react'
import { Steps, Card } from 'antd'
import { claimTrackerStages } from '../../utils/content.js'

import "./ClaimTracker.css"

const ClaimTracker = ({ size, largedots, outerStyle = {}, innerStyle = {} }) => {
    // TODO: need claimid to fetch current status
    const [stages, setStages] = useState(claimTrackerStages)
    const [currentStage, setCurrentStage] = useState(1)

    useEffect(() => {
        if (size == "small") {
            const stages = claimTrackerStages.map(s => {
                return {
                    key: s.key, title: s.title
                }
            })
            setStages(stages)
        }

    }, [size])
    return (
        <div className='NB-Claim-Tracker' style={{ ...outerStyle }}>


            <Card title="" bordered={false} className='card-style' style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #2D2C32',
                borderRadius: '1rem',
                // background: '#1b1b20',
                backgroundImage: 'linear-gradient(181.14deg, #212028 0.93%, #0F0F0F 56.18%)',
                padding: '1.25rem',
                ...innerStyle
            }}>
                <div className={`stages ${largedots ? 'stages--large-dots' : ''}`}>
                    <div className='title'>Claim Tracking</div>
                    <Steps
                        size={size}
                        progressDot
                        current={currentStage}
                        items={stages}
                    />
                    {size == "small" && <div className='stage-name'>Security Amount Deposited</div>}
                </div>

            </Card>

        </div>
    )
}

export default ClaimTracker