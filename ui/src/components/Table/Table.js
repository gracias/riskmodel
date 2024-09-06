import { Table } from 'antd';
import React from 'react';
import WalletConnect from '../WalletConnect/WalletConnect.js';
import "./Table.css";

const columns = [
    {
        title: 'Wallet',
        dataIndex: 'wallet',
        key: 'wallet',

    },
    {
        title: 'Fee Ins',
        dataIndex: 'fee',
        key: 'fee',
        render: (text, item) => {
            if (item.wallet === "Eligible For" || item.wallet === 'Insurance Cap') {
                return <span style={{ color: 'transparent', textShadow: '0 0 8px #fff' }}>${text}</span>
            }
            return <span>${text}</span>
        },
    },
    {
        title: 'Airdrop Tokens',
        dataIndex: 'tokens',
        key: 'tokens',
        render: (text) => {

            return <span style={{ color: 'transparent', textShadow: '0 0 8px #fff' }}>${text}</span>
        },
    },


];

const data = [
    {
        key: '1',
        wallet: 'Wipro',
        fee: '320',
        tokens: 'Not Eligible'
    },
    {
        key: '2',
        wallet: 'Nebula',
        fee: '320',
        tokens: '400'
    },
    {
        key: '3',
        wallet: 'Infosys',
        fee: '320',
        tokens: 'Not Eligigble'
    },
    {
        key: '4',
        wallet: 'Eligible For',
        fee: '$3200',
        tokens: '1900'
    },
    {
        key: '5',
        wallet: 'Insurance Cap',
        fee: '$500000',
        tokens: '4000'
    },
];

const App = () => {
    return (
        <Table
            title={() => <h2 style={{

                textAlign: 'left',
                color: '#EDEDED',
                fontSize: '1.5rem',
                padding: '0.5rem',
                lineHeight: '2rem',
                fontWeight: 700,
                marginTop: 0,
                marginBottom: 0,




            }}>Eligibility Criteria</h2>}
            footer={() => {
                return (
                    <>


                        <WalletConnect />
                    </>

                )
            }}
            className='NB-table'
            pagination={false}
            columns={columns} dataSource={data} />
    )
};

export default App;