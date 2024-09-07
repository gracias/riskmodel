import { Tabs } from 'antd';
import React from 'react';
import { basiDetailsTabItems } from '../../utils/content.js';

import "./Tabs.css"

const NebulaTabs = (props) => {
    const { onTabSelect, activeTab } = props


    return (
        <Tabs
            className='NB-Tabs'
            size='large'
            activeKey={activeTab}
            centered
            items={basiDetailsTabItems}
            onChange={onTabSelect} />
    )
}
export default NebulaTabs;