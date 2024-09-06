import React from 'react';
import "./Success.css";
import TransactionDetails from '../../components/TransactonDetails/TransactionDetails.js';
import PremiumDetails from '../../components/PremiumDetails/PremiumDetails.js';
import IconContainer from '../../components/IconContainer/IconContainer.js';

const TITLE = "Congratulations! You have successfully secured your future with Nebula's Term Life Insurance!"
const THANKS_NOTE = "Thank you for choosing us to provide you with the coverage you need."

const Icon = (props) => {
    const { className } = props
    return (
        <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9974 19.1653L18.3307 22.4986L25.8307 14.9986M33.3307 19.9986C33.3307 28.1794 24.4075 34.1293 21.1607 36.0234C20.7917 36.2387 20.6072 36.3463 20.3469 36.4022C20.1448 36.4455 19.85 36.4455 19.6479 36.4022C19.3876 36.3463 19.2031 36.2387 18.8341 36.0234C15.5873 34.1293 6.66406 28.1794 6.66406 19.9986V12.028C6.66406 10.6955 6.66406 10.0292 6.882 9.45649C7.07452 8.95055 7.38737 8.49911 7.79349 8.1412C8.25322 7.73604 8.87706 7.5021 10.1247 7.03423L19.0611 3.6831C19.4076 3.55317 19.5808 3.4882 19.759 3.46245C19.9171 3.4396 20.0777 3.4396 20.2358 3.46245C20.414 3.4882 20.5872 3.55317 20.9337 3.6831L29.8701 7.03423C31.1177 7.5021 31.7416 7.73604 32.2013 8.1412C32.6074 8.49911 32.9203 8.95055 33.1128 9.45649C33.3307 10.0292 33.3307 10.6955 33.3307 12.028V19.9986Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

const Success = () => {
    return (
        <div className='NB-Success-Page'>
            <div className='NB-Success'>

                {/* <div className="success-logo">
                    <div className='success-logo__inner'>
                        <Icon className='tick-icon' />
                    </div>
                </div> */}
                <IconContainer
                    innerWrapperStyle={{
                        background: 'linear-gradient(180deg, rgba(0, 192, 123, 0.3) 0%, rgba(0, 192, 123, 0) 100%)'

                    }}
                    outerWrapperStyle={{
                        background: 'linear-gradient(180deg, rgba(0, 192, 123, 0.3) 0%, rgba(0, 192, 123, 0) 100%)'

                    }}
                    innerStyle={{
                        height: '7rem',
                        width: '7rem',
                        margin: '-3.5rem 0 0 -3.5rem',
                        background: 'linear-gradient(180deg, rgba(0, 192, 123, 0.3) 0%, rgba(0, 192, 123, 0) 100%)',
                        borderRight: '2px solid #00C07B',
                        borderTop: '2px solid #00C07B'


                    }}
                    outerStyle={{
                        width: '10rem',
                        height: '10rem',
                        background: 'linear-gradient(227.85deg, #00C07B 7.35%, #032B1D 46.6%)',
                        borderRight: '2px solid #00C07B',
                        // borderBottom: '2px solid #00C07B'

                    }}>
                    <Icon className='tick-icon' />
                </IconContainer>
                <div className='text'>
                    <div className='title'>{TITLE}</div>
                    <div className='subtitle'>{THANKS_NOTE}</div>
                </div>
            </div>
            <div className='NB-Success-Details'>
                <TransactionDetails width={"100%"} />
                <PremiumDetails width={"100%"} />
            </div>
        </div>
    )
}

export default Success