import React from 'react'
import { Col, Row } from 'antd';



import Banner from '../../components/Banner/Banner.js';
import Table from '../../components/Table/Table.js';

import "./Home.css"

const Home = () => {
    return (
        <Row align={"stretch"}>
            <Col span={14}>
                <div className='NB-home__banner'>
                    <Banner />
                </div>

            </Col>
            <Col span={10}>
                <div className='NB-home__eligibility-grid'>
                    <Table />
                </div>
            </Col>
        </Row>
    )
}

export default Home