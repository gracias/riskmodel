import { Col, Row } from 'antd'
import React from 'react'
import InsuranceProduct from '../InsuranceProduct/InsuranceProduct.js'
import AddNominee from './AddNominee.js'

const Nominee = () => {

    return (
        <div className='NB-Nominee'>
            <Row align={"stretch"}>
                <Col span={8}>
                    <InsuranceProduct width="100%" />
                </Col>
                <Col span={16}>
                    <AddNominee />
                </Col>
            </Row>

        </div>
    )
}

export default Nominee