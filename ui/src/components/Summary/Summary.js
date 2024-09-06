import React, { useContext } from 'react'
import { Card, Row, Col } from 'antd'
import ContentTile from '../ContentTile/ContentTile.js'

import "./Summary.css"
import InsuranceProduct from '../InsuranceProduct/InsuranceProduct.js'
import { BasicDetailsContext } from '../../pages/Details/BasicDetails.js'

export const Summary = () => {
    const { details } = useContext(BasicDetailsContext)
    return (
        <div className='NB-Summary'>
            <Card title="Basic Info" bordered={false} style={{ width: "100%", border: '2px solid #2D2C32' }}>
                <div className='BasicInfo__summary'>
                    <Row align={"stretch"}>
                        <Col span={4}>
                            <ContentTile title="Gender" value={details?.basicInfo?.gender}></ContentTile>
                        </Col>
                        <Col span={4}>
                            <ContentTile title="Age" value={details?.basicInfo?.age}></ContentTile>
                        </Col>
                        <Col span={4}>
                            <ContentTile title="Country & Pincode" value={`${details?.basicInfo?.country} - ${details?.basicInfo?.pincode}`}></ContentTile>
                        </Col>
                        <Col span={4}>

                            <ContentTile title="Occupation" value={details?.basicInfo?.occupation}></ContentTile>
                        </Col>
                        <Col span={4}>
                            <ContentTile title="Monthly Income" value={`${details?.basicInfo?.income}`}></ContentTile>
                        </Col>
                        <Col>
                            <ContentTile title="Education Qualification" value={details?.basicInfo?.education}></ContentTile>
                        </Col>

                    </Row>

                </div>

            </Card>

            {/* Product card */}


            <div className='Product__summary'>
                <Row align={"stretch"}>
                    <Col span={24}>
                        <InsuranceProduct iconWidth="10%" width="100%" />
                    </Col>

                </Row>

            </div>

            <div className='Nominee__summary'>


                <Card title="Nominee Details" bordered={false} style={{ width: "100%", border: '2px solid #2D2C32' }}>
                    <div >
                        <Row align={"stretch"}>
                            <Col span={24}>
                                <ContentTile title="Relationship" value={details?.nominee?.relationship} />
                            </Col>


                        </Row>
                        <Row style={{ marginTop: '2rem' }} align={"stretch"}>
                            <Col span={24}>
                                <ContentTile title="Nominee Wallet Address" value={details?.nominee?.address} />
                            </Col>
                        </Row>

                    </div>
                </Card>
            </div>



        </div>
    )
}
