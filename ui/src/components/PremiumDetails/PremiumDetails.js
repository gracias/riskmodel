import React from 'react'

import { Card, Row, Col } from "antd"

import "./PremiumDetails.css"
import ContentTile from '../ContentTile/ContentTile.js'

const Icon = (props) => {
    const { className } = props
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8.00227V4.50292C16 3.67119 16 3.25532 15.8248 2.99974C15.6717 2.77645 15.4346 2.62477 15.1678 2.57935C14.8623 2.52737 14.4847 2.70164 13.7295 3.05019L4.85901 7.14426C4.18551 7.45511 3.84875 7.61054 3.60211 7.85159C3.38406 8.06469 3.21762 8.32482 3.1155 8.6121C3 8.93706 3 9.30795 3 10.0497V15.0023M16.5 14.5023H16.51M3 11.2023L3 17.8023C3 18.9224 3 19.4824 3.21799 19.9102C3.40973 20.2866 3.71569 20.5925 4.09202 20.7843C4.51984 21.0023 5.07989 21.0023 6.2 21.0023H17.8C18.9201 21.0023 19.4802 21.0023 19.908 20.7843C20.2843 20.5925 20.5903 20.2866 20.782 19.9102C21 19.4824 21 18.9224 21 17.8023V11.2023C21 10.0822 21 9.52211 20.782 9.09429C20.5903 8.71797 20.2843 8.412 19.908 8.22026C19.4802 8.00227 18.9201 8.00227 17.8 8.00227L6.2 8.00227C5.0799 8.00227 4.51984 8.00227 4.09202 8.22026C3.7157 8.412 3.40973 8.71796 3.21799 9.09429C3 9.52211 3 10.0822 3 11.2023ZM17 14.5023C17 14.7784 16.7761 15.0023 16.5 15.0023C16.2239 15.0023 16 14.7784 16 14.5023C16 14.2261 16.2239 14.0023 16.5 14.0023C16.7761 14.0023 17 14.2261 17 14.5023Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

const PremiumDetails = ({ width }) => {
    return (
        <div className='NB-PremiumDetails'>
            <Card title="Total Premium Paid" bordered={false} className='card-style gradient-bg' style={{ width, border: '2px solid #2D2C32' }}>
                <div className='NB-PremiumDetails__content'>
                    <Row align={"stretch"}>
                        <Col span={7}>
                            <ContentTile title="Tokens Given" value="400.19" />
                        </Col>
                        <Col span={7}>
                            <ContentTile title="Premium Paid" value="$10" />
                        </Col>
                        <Col span={10}>
                            <ContentTile title="Value of tokens in wallet" value="$19.19" />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '5.5rem' }} align={"stretch"}>
                        <Col span={16}>
                            1 Token = 0.25 MATIC
                        </Col>
                        <Col span={8}>
                            <div className='wallet' >
                                <Icon className='wallet-icon' />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Card>

        </div>
    )
}

export default PremiumDetails