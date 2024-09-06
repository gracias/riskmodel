import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import InsuranceItem from '../../components/InsuranceItem/InsuranceItem.js';

import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import EncryptedInsuranceItem from '../../components/InsuranceItem/EncryptedInsuranceItem.js';
import ClaimDetails from '../ClaimDetails/ClaimDetails.js';
import "./Dashboard.css";



const { Header, Sider, Content } = Layout;
const Dashboard = () => {
    const [insurances, setInsurances] = useState([])
    const [claims, setClaims] = useState([1])
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("2")
    const [selectedClaim, setSelectedClaim] = useState(null)

    const location = useLocation();
    const navigate = useNavigate()
    
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        let ignore = false

        const fetchPolicies = async () => {
            try {
                const res = await axios.get('http://localhost:3001/policies')
                
                if (res && res.data && res.data.users) {
                setInsurances(res.data.users)
                }
            } catch(e) {
                console.log(e)
            }
        }

        if (!ignore) {
            fetchPolicies()
        }

        return () => {
            ignore = true
        }
    }, [])

   

    useEffect(() => {
       
        if (location) {
            if (location.pathname == '/policies') {
                setSelectedMenu('2')
                setSelectedClaim(null)
            } else if (location.pathname == '/claims') {
                setSelectedMenu('3')
                setSelectedClaim(null)
            } else if (location.pathname == '/claims/details/') {
                setSelectedMenu('3')
                const claimId = new URLSearchParams(location.search).get('id');
                setSelectedClaim(claimId)
            } else {
                setSelectedMenu('2')
                setSelectedClaim(null)
            }

        }


    }, [location])

    const handleMenuChange = (item) => {
        switch (item.key) {
            case '2':
                navigate('/policies')
                break
            case '3':
                navigate('/claims')
                break
            default:
                navigate('/policies')
                break
        }

    }
    const handleNavigateToClaims = () => {
        navigate('/claims')
    }

    const renderBreadCrumb = () => {
        if (selectedClaim) {
            return <div className='breadcrumbs'> <span style={{ cursor: 'pointer', color: '#B48DFF' }} onClick={handleNavigateToClaims}>Claims &gt;</span><span>&nbsp;{selectedClaim}</span></div>
        }

        return <></>
    }

    const renderHeading = () => {
        switch (selectedMenu) {
            case '1':
                return <div></div>
            case '2':
                return <div className='page-title'>
                    <h2>All Policies</h2>
                    {/* <Button type="default" size="large">Show My Policies</Button> */}
                </div>
            case '3':
                return <div className='page-title'>Claims</div>
            default:
                return <div className='page-title'>My Policies</div>
        }
    }

    const renderContent = () => {
        switch (selectedMenu) {
            case '1':
                return
            case '2':
                return <>
                    {
                        !insurances.length ? <div><h3>No policies are available</h3></div> : (
                            <>
                            {insurances.map(insurance => {
                            return (
                                <EncryptedInsuranceItem key={insurance.id} data={insurance} />
                            )
                            })}
                            
                            </>
                        )
                    }
                </>
            case '3':
                if (selectedClaim) {
                    return <ClaimDetails id={selectedClaim} />
                } else {
                    return <>
                        {
                            claims.map(_claim => {
                                return <InsuranceItem withClaimTracker={true} />
                            })
                        }
                    </>
                }
        }
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{
                background: 'linear-gradient(180deg, #222129 0%, #000000 100%)'

            }}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedMenu]}
                    defaultSelectedKeys={['2']}
                    onSelect={handleMenuChange}


                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Dashboard',
                            disabled: true
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'Policies',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'Claim',
                        },
                        {
                            key: '4',
                            icon: <UploadOutlined />,
                            label: 'Refer & Earn',
                        },
                        {
                            key: '5',
                            icon: <UploadOutlined />,
                            label: 'Support',
                        },
                    ]}
                />
            </Sider>
            <Layout className='NB-Dashboard'>
                <div
                    style={{
                        padding: 0,
                        paddingLeft: '1.5rem',
                        marginLeft: '1rem',
                        marginRight: '1rem',
                        textAlign: 'left',
                        fontSize: '1.25rem',
                        background: colorBgContainer,
                    }}
                >
                    {
                        renderHeading()
                    }

                    {
                        renderBreadCrumb()
                    }

                </div>
                <Content
                    style={{
                        margin: '1.5rem 1rem',
                        padding: '1.5rem',
                        minHeight: '100vh',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};
export default Dashboard;