import React, { useContext, useEffect, useState } from 'react'
import { Steps, Col, Row } from 'antd';
import { basicInfoStepItems } from '../../utils/content.js'
import Gender from '../Gender/Gender.js';
import Age from '../Age/Age.js';
import Location from '../Location/Location.js';
import Occupation from '../Occupation/Occupation.js';
import MonthlyIncome from '../MonthlyIncome/MonthlyIncome.js';
import Education from '../Education/Education.js';
import { BasicDetailsContext } from '../../pages/Details/BasicDetails.js';
import "./BasicInfo.css"


const BasicInfo = () => {
  const { details, setDetails } = useContext(BasicDetailsContext);
  const [steps, setSteps] = useState(() => {
    return basicInfoStepItems.map(step => step)
  })

  const [active, setActive] = useState(0)



  const handleGender = (value) => {
    setDetails({ ...details, basicInfo: { ...details.basicInfo, gender: value } })
  }

  const handleAge = (value) => {
    setDetails({ ...details, basicInfo: { ...details.basicInfo, age: value } })
  }

  const handleCountry = (value) => {
    setDetails({ ...details, basicInfo: { ...details.basicInfo, country: value, pincode: "" } })
  }

  const handlePin = (value) => {
    setDetails({ ...details, basicInfo: { ...details.basicInfo, pincode: value } })
  }

  const handleOccupation = value => {
    setDetails({ ...details, basicInfo: { ...details.basicInfo, occupation: value } })
  }

  const handleIncome = value => {
    setDetails({ ...details, basicInfo: { ...details.basicInfo, income: value } })
  }


  const handleEducation = value => {
    setDetails({ ...details, basicInfo: { ...details.basicInfo, education: value } })
  }

  const renderContent = () => {
    switch (active + 1) {
      case 1:
        return <Gender defaultValue="male" gender={details.basicInfo.gender} handleGender={handleGender} />
      case 2:
        return <Age min={18} max={65} step={1} defaultValue={18} age={details.basicInfo.age} handleAge={handleAge} />
      case 3:
        return <Location
          selectedVal={details.basicInfo.country}
          pincode={details.basicInfo.pincode}
          placeholder="Select country"
          optionFilterProp="value"
          handleCountry={handleCountry}
          handlePin={handlePin}
        />
      case 4:
        return <Occupation
          occupation={details.basicInfo.occupation}
          placeholder="Select Occupation"
          optionFilterProp="value"
          handleOccupation={handleOccupation}
        />
      case 5:
        return <MonthlyIncome income={details.basicInfo.income} placeholder="Enter monthly income" handleIncome={handleIncome} />
      case 6:
        return <Education
          education={details.basicInfo.education}
          placeholder="Select Qualification"
          handleEducation={handleEducation}
          optionFilterProp="value"
        />
      default: return <></>
    }
  }
  return (
    <div className='NB-Basic-Info'>
      <Row align={"stretch"}>
        <Col span={9}>
          <div className='gradient-bg-outer'>
            <div className="NB-Basic-Info__nav gradient-bg">
              <Steps
                direction="vertical"
                onChange={setActive}
                current={active}
                items={steps}
              />
            </div>
          </div>
        </Col>
        <Col span={15} align="start">
          <div className='NB-Basic-Info__content'>
            {renderContent()}
          </div>
        </Col>
      </Row>


    </div>
  )
}

export default BasicInfo