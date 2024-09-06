import React from 'react'


import "./Banner.css";
import Stat from '../Stat/Stat.js';

const STATS = [
    {
        id: 1,
        title: 'MKR on hat',
        value: '105,678'
    },
    {
        id: 2,
        title: 'Active Polls',
        value: '5'
    },
    {
        id: 3,
        title: 'Aligned Delegates',
        value: '35+'
    },
    {
        id: 4,
        title: 'Shadow Delegates',
        value: '53'
    }
]

const Banner = () => {
    return (
        <div className='NB-Banner'>
            <div className="NB-Banner__content">

                <h1
                    style={{
                        fontSize: '2.5rem',
                        textAlign: 'left', letterSpacing: 2, margin: 0, marginBottom: '1rem'
                    }}
                >
                    The <span style={{ fontWeight: 'bold', fontSize: '3.5rem' }}>Revolution</span> is now here
                </h1>
                <h3 style={{
                    marginTop: 0,
                    marginBottom: '2rem',
                    letterSpacing: 2,
                    textAlign: 'left',
                    color: '#A1A0A6'
                }}>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</h3>
                <div className='NB-stats gradient-bg'>
                    {STATS.map(stat => {
                        return <Stat key={stat.id} title={stat.title} value={stat.value} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Banner