import { Button, Card, Input, Row, Col } from 'antd';
import React, { useState } from 'react';

import "./Simulation.css";
import axios from 'axios';




const Simulation = () => {
    const [simulations, setSimulations] = useState('')
    const [portSize, setPortSize] = useState('')
    const [percentile, setPercentile] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState({})

    const handleEvaluate = async () => {
        if (loading) return
        setLoading(true)
        if(!portSize || !simulations || !percentile) {
            return;
        }
        try {
            const res = await axios.post("http://localhost:3001/simulate", {
                simulations, portSize, percentile
            })
           
            if (res && res.data) {
                const data = JSON.parse(res.data.result)
                setResult(data)
            }
            setLoading(false)
        } catch(e) {
            setLoading(false)
            console.log(e)
        }
    }

    const handleInputChange = (key, e) => {
        
        if (key == 'simulations') {
            setSimulations(e.target.value)
        }
        if (key == 'portSize') {
            setPortSize(e.target.value)
        }
        if (key == 'percentile') {
            setPercentile(e.target.value)
        }

    }
    
    return (
        <div className='NB-Simulation-Page'>
         <Row align={"stretch"}>
            <Col span={12}>
            <Card  bordered={false} className='gradient-bg' style={{ border: '2px solid #2D2C32', margin: '1rem' }}>
                <div className='filed-container'>
                <Input placeholder='Number of simulations' value={simulations} onChange={(e) => handleInputChange('simulations', e)} />
                </div>
              <div className='field-container'>
              <Input placeholder='Portfolio size' value={portSize} onChange={(e) => handleInputChange('portSize', e)} />
              </div>
               <div className='field-container'>
               <Input placeholder='Percentile required' value={percentile} onChange={(e) => handleInputChange('percentile', e)} />
               </div>
                <div className='field-container'>
                <Button 
                disabled={!portSize || !simulations || !percentile}
                loading={loading} onClick={handleEvaluate} type="default" size="large">Evaluate</Button>
                </div>
            </Card>
            </Col>
            <Col span={12}>
            <Card  bordered={false} className='gradient-bg' style={{ border: '2px solid #2D2C32', margin: '1rem' }}>
                <div className='field-container'>
                <p style={{textAlign: 'left'}}>Number of claims percentile</p>
                <Input readOnly  value={result.percentileClaims}  />
                </div>
                <div className='field-container'>
                <p style={{textAlign: 'left'}}>Number of claims median</p>
                <Input readOnly  value={result.medianClaims}  />
                </div>
                <div className='field-container'>
                <p style={{textAlign: 'left'}}>Claims cost percentile</p>
                <Input readOnly  value={result.percentileClaimsCost}  />
                </div>
                <div className='field-container'>
                <p style={{textAlign: 'left'}}>Profit share percentile</p>
                <Input readOnly  value={result.percentileProfitShare}  />
                </div>
                <div className='field-container'>
                <p style={{textAlign: 'left'}}>Claims cost median</p>
                <Input readOnly  value={result.medianClaimsCost}  />
                </div>
                <div className='field-container'>
                <p style={{textAlign: 'left'}}>Profit share median</p>
                <Input readOnly  value={result.medianProfitShare}  />
                </div>
            </Card>
            </Col>
         </Row>
        </div>
    )
}

export default Simulation