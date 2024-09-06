import { Tag } from 'antd'
import React from 'react'

import "./ProductTitle.css";

const ProductTitle = (props) => {
    const { product } = props
    return (
        <div className='NB-Insurance-Product__content'>
            <div className='NB-Insurance-Product__content__text'>
                <h2 className='NB-Insurance-Product__content__title'>{product.title}</h2>
                <div className='NB-Insurance-Product__content__subtitle'>{product.description}</div>
                <div className='NB-Insurance-Product__content__tags'>
                    <Tag><span>Accidental Health</span></Tag>
                    <Tag><span>Total Permanent Disability</span></Tag>
                    <Tag><span>+2 more</span></Tag>
                </div>
            </div>

        </div>
    )
}

export default ProductTitle