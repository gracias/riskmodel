import React, { useState } from 'react'
import { Card, Table, Tabs, Steps } from 'antd'
import ContentTile from '../ContentTile/ContentTile.js'

import "./ClaimStatusGrid.css"
import { claimTrackerStages } from '../../utils/content.js'

const handleAction = (text) => {
    
}

const historyColumns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (text) => <span>{text}</span>,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
            if (text == 'Rejected') {
                return <span style={{ color: 'red' }}>{text}</span>
            } else if (text == "Approved") {
                return <span style={{ color: 'green' }}>{text}</span>
            } else {
                return <span>{text}</span>
            }
        },
    },
    {
        title: 'Deposit Amount',
        dataIndex: 'depositAmount',
        key: 'depositAmount',
        render: (text) => <span>${text}</span>,
    },
    {
        title: 'Reason',
        dataIndex: 'reason',
        key: 'reason',
    },

    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text) => {
            if (text) {
                return <span style={{ cursor: 'pointer' }} onClick={() => handleAction(text)}>{text}</span>
            }
            return <>-</>
        }
    },


];
const historyData = [
    {
        key: '1',
        date: '23 May 2024',
        status: 'Rejected',
        depositAmount: '140',
        reason: 'Incorrect identity file uploaded',
        action: 'Reupload'
    },
    {
        key: '2',
        date: '23 May 2024',
        status: 'Rejected',
        depositAmount: '100',
        reason: 'Lore ipsum lorem ipsum upsum',
        action: ''
    },
    {
        key: '3',
        date: '24 May 2024',
        status: 'Rejected',
        depositAmount: '40',
        reason: 'Lorem ipsum upsum juiiitx',
        action: ''
    }
];

const columns = [
    {
        title: 'Document Type',
        dataIndex: 'documentType',
        key: 'documentType',
        render: (text) => <span>{text}</span>,
    },
    {
        title: 'Uploaded File',
        dataIndex: 'uploadedFile',
        key: 'uploadedFile',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Uploaded On',
        dataIndex: 'uploadedDate',
        key: 'uploadedDate',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
            if (text == 'Rejected') {
                return <span style={{ color: 'red' }}>{text}</span>
            } else if (text == "Approved") {
                return <span style={{ color: 'green' }}>{text}</span>
            } else {
                return <span>{text}</span>
            }
        },
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text) => {
            if (text) {
                return <span style={{ cursor: 'pointer' }} onClick={() => handleAction(text)}>{text}</span>
            }
            return <>-</>
        }
    },


];
const data = [
    {
        key: '1',
        documentType: 'Relationship Proof',
        uploadedFile: 'IdentityCard.pdf',
        uploadedDate: '18 May 2024',
        status: 'Rejected',
        action: 'Reupload'
    },
    {
        key: '2',
        documentType: 'Death Proof',
        uploadedFile: 'DeathCertificate.pdf',
        uploadedDate: '19 May 2024',
        status: 'Approved',
        action: ''
    },
    {
        key: '3',
        documentType: 'Address Proof',
        uploadedFile: 'AadharCard.pdf',
        uploadedDate: '19 May 2024',
        status: 'Approved',
        action: ''
    }
];

const items = [
    {
        key: '1',
        label: 'Claim Details',

    },
    {
        key: '2',
        label: 'Claim Tracking',

    },
    {
        key: '3',
        label: 'Claim History',

    },
];



const ClaimStatusGrid = () => {
    const [selectedTab, setSelectedTab] = useState('1')
    const [currentClaimStage, setCurrentClaimStage] = useState(2)

    const handleTabChange = (key) => {
        setSelectedTab(key)
    }

    const renderTabContent = () => {
        switch (selectedTab) {
            case '1':
                return (
                    <>
                        <div className='stats'>
                            <ContentTile title="Claim Deposit" value="$40" />
                            <ContentTile title="Claim Deposit Status" value="Paid" />
                            <ContentTile title="Claim Approval" value="Rejected" />
                        </div>
                        <div className='table-title'>Documents Uploaded</div>
                        <div className='table'>
                            <Table columns={columns} dataSource={data} />
                        </div>
                    </>
                )
            case '2':
                return (
                    <div className='claim-stages'>
                        <Steps
                            direction="vertical"
                            current={currentClaimStage}
                            items={claimTrackerStages}
                        />
                    </div>
                )
            case '3':
                return (
                    <div className='history'>
                        <div className='table'>
                            <Table columns={historyColumns} dataSource={historyData} />
                        </div>
                    </div>
                )
        }
    }
    return (
        <div className='NB-Claim-Status-Grid'>
            <Card title="" bordered={false} className='card-style gradient-bg'
                style={{ width: '100%', border: '2px solid #2D2C32', borderRadius: 0 }}>
                <div className='options'>
                    <Tabs
                        defaultActiveKey="1"
                        selectedTab={selectedTab}
                        items={items}
                        onChange={handleTabChange}

                    />
                </div>
                {
                    renderTabContent()
                }
            </Card>
        </div>
    )
}

export default ClaimStatusGrid