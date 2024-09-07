import { Button, Card, Input, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';

import "./Simulation.css";
import axios from 'axios';
import LineChart from '../../components/LineChart/LineChart';




const Simulation = () => {
    const [simulations, setSimulations] = useState('')
    const [portSize, setPortSize] = useState('')
    const [percentile, setPercentile] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState({})
    const [portfolioNumbers, setPortfolioNumbers] = useState([]);
    const [percentileLosses, setPercetileLosses] = useState([])

    useEffect(() => {

        console.log("percentile losses", percentileLosses)
        console.log("portfolioNumbers", portfolioNumbers)

    }, [portfolioNumbers, percentileLosses])
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
           
            if (res && res.data & res.data.result) {
                const data = JSON.parse(res.data.result)
                setResult(data)
                setPortfolioNumbers([...portfolioNumbers, portSize])
                setPercetileLosses([...percentileLosses, result.percentileLoss])
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
                <p style={{textAlign: 'left'}}>Number of simulations</p>
                <Input placeholder='Number of simulations' value={simulations} onChange={(e) => handleInputChange('simulations', e)} />
                </div>
              <div className='field-container'>
              <p style={{textAlign: 'left'}}>Size of portfolio</p>
              <Input placeholder='Portfolio size' value={portSize} onChange={(e) => handleInputChange('portSize', e)} />
              </div>
               <div className='field-container'>
               <p style={{textAlign: 'left'}}>Percentile</p>
               <Input placeholder='Percentile required' value={percentile} onChange={(e) => handleInputChange('percentile', e)} />
               </div>
                <div className='field-container'>
                <Button 
                disabled={!portSize || !simulations || !percentile}
                loading={loading} onClick={handleEvaluate} type="default" size="large">Evaluate</Button>
                </div>
            </Card>
            <Card  bordered={false} className='gradient-bg' style={{ border: '2px solid #2D2C32', margin: '1rem' }}>
                <LineChart 
                // portfolioNumbers={portfolioNumbers} percentileLosses={percentileLosses} 
                />
            </Card>
            </Col>
            <Col span={12}>
            <Card  bordered={false} className='gradient-bg' style={{ border: '2px solid #2D2C32', margin: '1rem' }}>
                <div className='field-container'>
                <p style={{textAlign: 'left'}}>Number of claims {percentile ? `${percentile}th` :''} percentile</p>
                <Input readOnly  value={result.percentileClaims}  />
                </div>
               
                <div className='field-container'>
                <p style={{textAlign: 'left'}}>Claims cost {percentile ? `${percentile}th` :''} percentile</p>
                <Input readOnly  value={result.percentileClaimsCost}  />
                </div>
                <div className='field-container'>
                <p style={{textAlign: 'left'}}>Profit share {percentile ? `${percentile}th` :''} percentile</p>
                <Input readOnly  value={result.percentileProfitShare}  />
                </div>
                <div className='field-container'>
                <p style={{textAlign: 'left'}}>Loss {percentile ? `${percentile}th` :''} percentile</p>
                <Input readOnly  value={result.percentileLoss}  />
                </div>

                {/* Median values */}
                <div className='field-container'>
                <p style={{textAlign: 'left'}}>Number of claims median</p>
                <Input readOnly  value={result.medianClaims}  />
                </div>
                <div className='field-container'>
                <p style={{textAlign: 'left'}}>Claims cost median</p>
                <Input readOnly  value={result.medianClaimsCost}  />
                </div>
                <div className='field-container'>
                <p style={{textAlign: 'left'}}>Profit share median</p>
                <Input readOnly  value={result.medianProfitShare}  />
                </div>
                <div className='field-container'>
                <p style={{textAlign: 'left'}}>Loss median</p>
                <Input readOnly  value={result.medianLoss}  />
                </div>
                
            </Card>
            </Col>
         </Row>
        </div>
    )
}

export default Simulation