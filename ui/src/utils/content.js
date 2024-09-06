import {
    UnorderedListOutlined,
    CreditCardOutlined,
    UserAddOutlined,
    FileUnknownOutlined,
    FileTextOutlined
    // UserOutlined, HeartOutlined, FileTextOutlined
} from '@ant-design/icons';
export const basiDetailsTabItems = [
    {
        key: '1',
        label: 'Basic Info',

        icon: <FileUnknownOutlined />

    },
    {
        key: '2',
        label: 'Choose Product',

        icon: <UnorderedListOutlined />
    },
    // {
    //     key: '3',
    //     label: 'Health Info',

    //     icon: <HeartOutlined />
    // },
    // {
    //     key: '4',
    //     label: 'Choose Agent',

    //     icon: <UserOutlined />
    // },
    // {
    //     key: '5',
    //     label: 'Document Upload',

    //     icon: <FileTextOutlined />
    // },
    {
        key: '3',
        label: 'Add Nominee',

        icon: <UserAddOutlined />
    },
    {
        key: '4',
        label: 'Summary',

        icon: <FileTextOutlined />
    },
    {
        key: '5',
        label: 'Payment',

        icon: <CreditCardOutlined />
    },
];

export const basicInfoStepItems = [
    {
        key: '1',
        title: 'Gender',




    },
    {
        key: '2',
        title: 'Age',



    },
    {
        key: '3',
        title: 'Country & Pincode',


    },
    {
        key: '4',
        title: 'Occupation',


    },
    {
        key: '5',
        title: 'Monthly Income',


    },
    {
        key: '6',
        title: 'Education Qualification',


    },
];

export const claimTrackerStages = [
    {
        key: "1",
        title: "",
        description: "Security Payment"
    },
    {
        key: "2",
        title: "",
        description: "Documents Uploaded"
    },
    {
        key: "3",
        title: "",
        description: "Claim Processing"
    },
    {
        key: "4",
        title: "",
        description: "Claim Approved"
    },
    {
        key: "5",
        title: "",
        description: "Payout deposited"
    }
]