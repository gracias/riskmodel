import { Flex, Layout, theme } from 'antd';
import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import ClaimApology from '../../pages/ClaimApology/ClaimApology.js';
import ClaimProcessingFee from '../../pages/ClaimApology/ClaimProcessingFee.js';
import Dashboard from '../../pages/Dashboard/Dashboard.js';
import BasicDetails from '../../pages/Details/BasicDetails.js';
import Home from '../../pages/Home/Home.js';
import Success from '../../pages/Success/Success.js';
import NBHeader from './NBHeader.js';
import Simulation from '../../pages/Simulation/Simulation.js';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: '/basic-details',
        element: <BasicDetails />
    },
    {
    path: '/simulation',
    element: <Simulation />
    },

    {
        path: '/success',
        element: <Success />
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    },

    {
        path: '/policies',
        element: <Dashboard />
    },
    {
        path: '/claims',
        element: <Dashboard />
    },
    {
        path: '/claims/details',
        element: <Dashboard />
    },
    {
        path: '/claim-apology',
        element: <ClaimApology />
    },
    {
        path: '/claim-processing',
        element: <ClaimProcessingFee />
    }
]);





const { Header, Content } = Layout;
const { useToken } = theme;

const AppLayout = () => {

    const { token } = useToken();

    const contentStyle = {
        textAlign: 'center',
        minHeight: 'calc(100vh - 64px)',

        color: '#fff',
        backgroundColor: token.colorBgBase
    };

    const headerStyle = {
        textAlign: 'center',
        color: '#fff',
        height: 64,
        background: 'linear-gradient(180deg, #000000 50%, #222129 100%)',
        borderBottom: '1px solid #2D2C32'
    };


    return (
        <Flex>
            <Layout>
                <Header style={headerStyle}>
                    <NBHeader />
                </Header>
                <Content style={contentStyle}>

                    <RouterProvider router={router} />
                </Content>

            </Layout>


        </Flex>
    );
}
export default AppLayout;

