import React, { useContext, useEffect, useState } from 'react'
import { Card, Radio, Row, Col } from 'antd';

import "./Payment.css"
import InsuranceProduct from '../InsuranceProduct/InsuranceProduct.js';
import { BasicDetailsContext } from '../../pages/Details/BasicDetails.js';

const Payment = () => {
    const { details, setDetails } = useContext(BasicDetailsContext)


    const handleChange = e => {
        setDetails({ ...details, payment: { ...details.payment, payer: e.target.value } })
    }
    return (
        <div className='NB-Payment'>

            <div className='Product__summary'>
                <Row align={"stretch"}>
                    <Col span={24}>
                        <InsuranceProduct iconWidth="10%" width="100%" />
                    </Col>

                </Row>

            </div>
            <div className='Payment-details'>
                <h2 className='NB-Payment__title'>Payment</h2>
                <Card title="Choose Payer" bordered={false} style={{ width: "100%", border: '2px solid #2D2C32' }}>
                    <Radio.Group onChange={handleChange} defaultValue={details.payment.payer} size="large">
                        <Radio.Button value={1}>I will make the payment</Radio.Button>
                        <Radio.Button disabled style={{ marginLeft: '1rem' }} value={2}>Someone else is paying</Radio.Button>


                    </Radio.Group>
                </Card>
            </div>
        </div>
    )
}

export default Payment