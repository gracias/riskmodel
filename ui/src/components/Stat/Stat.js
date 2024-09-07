import React from 'react'
import "./Stat.css";

const Stat = ({ title, value }) => {
    return (
        <div className='NB-Stat'>
            <span className='NB-Stat__title'>{title}</span> <br />
            <span className='NB-Stat__value'>{value}</span>
        </div>
    )
}

export default Stat