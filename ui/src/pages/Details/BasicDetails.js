import React, { createContext, useEffect, useState } from 'react';

import NebulaTabs from '../../components/Tabs/Tabs.js';

import BasicInfo from '../../components/BasicInfo/BasicInfo.js';
import "./BasicDetails.css";

import InsuranceProduct from '../../components/InsuranceProduct/InsuranceProduct.js';
import Nominee from '../../components/Nominee/Nominee.js';
import Payment from '../../components/Payment/Payment.js';
import { Summary } from '../../components/Summary/Summary.js';

import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
// Set up your contract address and ABI
import NBButton from '../../components/NBButton/NBButton.js';
import { encryptData } from '../../encryption/encrypt.js';
import PRODUCT_ABI from "../../ethereum/abi/Product.json";
import ERC20_ABI from "../../ethereum/abi/USDC.json";
import { storeOnIrys } from '../../encryption/storeOnIrys.js';
import axios from 'axios';
import { connectLit, disconnectLit } from '../../encryption/litnode.js';


// Example USDC token address on Arbitrum or Sepolia
const TOKEN_ADDRESS = "0x6890b3b7AE59390D840CA2ED9dFe5D0F6F102a4E"; // Replace with actual token address
const TREASURY = "0x5c64c82aE66052C85506fDe770e90080e09f8E24";
const PRODUCT_ADDRESS = "0xEAc37039D36b1c05076d811ffF3511b9fcbB69A9"


const basicInfoFields = ['gender', 'age', 'country', 'pincode', 'income', 'occupation', 'education']

export const BasicDetailsContext = createContext(null)
const test = true

const BasicDetails = () => {
  const navigate = useNavigate()
  const [policyDetails, setPolicyDetails] = useState(null)
  const [approved, setApproved] = useState(false)
  const [buyingPolicy, setBuyingPolicy] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [isPaying, setIsPaying] = useState(false)

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [walletAddress, setAddress] = useState(null);
  const [activeTab, setActiveTab] = useState("1")
  const [details, setDetails] = useState({
    basicInfo: {
      gender: 'male',
      age: 18,
      country: "",
      pincode: "",
      occupation: "",
      income: "",
      education: ""
    },
    product: {
      title: 'Term Life Insurance',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      sumAssured: 10,
      currency: '$',
      token: 'USDC',
      premium: 0.1,
      frequency: 10,
      period: 'monthly',
      years: 1,
      tags: []
    },
    nominee: { relationship: "", address: "" },
    payment: {
      payer: 1,
      approved: false
    }
  })

  useEffect(() => {
   
  }, [details])

  useEffect(() => {
    if (localStorage.getItem('address')) {
      setAddress(localStorage.getItem('address'))
    }

  }, [])



  const initProvider = async () => {
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    const tempSigner = tempProvider.getSigner();
    setProvider(tempProvider);
    setSigner(tempSigner);
  };


  useEffect(() => {
    const init = async () => {
      await initProvider()
    }

    // init()
  })

  const onTabSelect = (tab) => {

    setActiveTab(tab)
  }


  const renderContent = () => {

    switch (+activeTab) {
      case 1:
        return <BasicInfo />
      case 2:
        return <InsuranceProduct width="50%" />
      // case 3:
      //   return 'health'
      // case 4:
      //   return 'agent'
      // case 5:
      //   return 'docs'
      case 3:
        return <Nominee />
      case 4:
        return <Summary />
      case 5:
        return <Payment />
    }
  }

  const isBasicInfoFilled = () => {
    return basicInfoFields.every(field => {
      return details.basicInfo[field]
    })
  }

  const isNomineeFilled = () => {
    return details && details.nominee && details.nominee.relationship && details.nominee.address
  }

  const isPaymentFilled = () => {
    return details && details.payment && details.payment.payer && details.payment.approved
  }

  const isApproveEnabled = () => {
    return details && details.payment && details.payment.payer
  }

  const checkBalance = async (tokenContract, required) => {
    try {
      
      const addr = ethers.utils.getAddress(walletAddress)
      const balanceBig = await tokenContract.balanceOf(addr)
      const balance = ethers.utils.formatUnits(balanceBig, 6)
      
      if (balance < required) {
        throw Error("Not enough balance tokens")
      }
    } catch (err) {
      console.log(err)
    }
  }


  const checkAllowance = async (tokenContract, required) => {
    try {
      const addr = ethers.utils.getAddress(walletAddress)
      const allowanceBig = await tokenContract.allowance(addr, TREASURY)
      const allowance = ethers.utils.formatUnits(allowanceBig, 6)
      if (allowance < required) {
        return false
      } else {
        return true
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleApprove = async () => {
    if (isApproving) return
    if (test) {
      setApproved(true)
      return
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner();
    if (!provider || !signer) return;
    const abi = ERC20_ABI['abi']
    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, abi, signer);
    const approveAmount = details.product.premium * details.product.frequency * details.product.years;
    try {
      setIsApproving(true)
      await checkBalance(tokenContract, approveAmount)

      const enoughAllowance = await checkAllowance(tokenContract, approveAmount)
      

      if (enoughAllowance) {
        alert("Already approved");
        setIsApproving(false)
        setApproved(true)
        return
      }
      const tx = await tokenContract.approve(TREASURY, ethers.utils.parseUnits(`${approveAmount}`, 6));
      
      await tx.wait();
      alert("Approval successful!");
      setIsApproving(false)
      setApproved(true)
    } catch (err) {
      console.error(err);
      alert("Approval failed!");
      setIsApproving(false)
    }
  };


  const handleTransfer = async () => {
    if (buyingPolicy) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner();
    if (!provider || !signer) return;

    if (test) {
      setBuyingPolicy(true)
      try {
        const dataToEncrypt = JSON.stringify(details)
        await connectLit()
        const [ciphertext, dataToEncryptHash] = await encryptData(signer, walletAddress, dataToEncrypt, 'My PI data')
       

        if (ciphertext && details.nominee) {
      
          const encryptedDID = await storeOnIrys(provider, ciphertext, dataToEncryptHash, walletAddress, details.nominee.address)
          
          if (encryptedDID) {
            const response = await axios.post('http://localhost:3001/policies', {
              encryptedDID
    
              })
              
              if (response && response.data && response.data.success) {
                setBuyingPolicy(false)
                navigate("/success")
              }
          }
         
     
          // TODO: call api
          // API to store data on irys
          // store data on mongodb  { address: owneraddress, resource: receipt.id, nominee: nomineeAddress }

          // call api to fetch all docs in collection, fetch from irys, return resp
          // client can decrypt only the ones he is allowed to
        }
      } catch(err) {
        setBuyingPolicy(false)
        console.log(err)
      } finally {
        await disconnectLit()
      }
      // navigate("/success")
      return
    }


    // apply for policy

    try {
      setBuyingPolicy(true)
      await applyForPolicy()
    } catch (err) {
      setBuyingPolicy(false)
      alert("Payment Failed")
      console.log(err)
    }
    // const abi = ERC20_ABI['abi']
    // const tokenContract = new ethers.Contract(TOKEN_ADDRESS, abi, signer)
    // const amount = details.product.premium * details.product.frequency * details.product.years;

    // try {

    //   const tx = await tokenContract.transfer(TREASURY, ethers.utils.parseUnits(`${amount}`, 6));
    //   await tx.wait();
    //   alert("Transfer successful!");
    // } catch (err) {
    //   console.error(err);
    //   alert("Transfer failed!");
    // }
  };

  const logPolicyCreated = (processId,
    policyHolder,
    nominee, sumInsured,
    premium,
    event) => {
   

    // show success page
    // show details
    setPolicyDetails({
      processId, premium, nominee, sumInsured, policyHolder
    })
    // setPolicyError("")
    // setOpen(true)



  }

  const logNebulaApplicationRejected = (processId,
    policyHolder, premium) => {
    
  }


  const getProductContract = async () => {


    // new_contract.on("LogNebulaPolicyCreated", logPolicyCreated)
    // new_contract.on("LogNebulaPremiumPaymentFailed", logNebulaPremiumPaymentFailed)
    // new_contract.on("LogNebulaClaimConfirmed", logNebulaClaimConfirmed)
    // new_contract.on("LogNebulaApplicationRejected", logNebulaApplicationRejected)
    // new_contract.on("LogNebulaPayoutExecuted", logNebulaPayoutExecuted);
    // new_contract.on("LogNebulaNomineeFound", LogNebulaNomineeFound)
    // new_contract.on("LogPayoutZero", LogPayoutZero)
    // new_contract.on("LogClaimCreated", LogClaimCreated)
    // new_contract.on("LogClaimConfirmed", LogClaimConfirmed)

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner();
    if (!provider || !signer) return;
    const abi = (PRODUCT_ABI)['abi'];
    const productContract = new ethers.Contract(PRODUCT_ADDRESS, abi, signer);

    // register events

    productContract.on("LogNebulaPolicyCreated", logPolicyCreated)
    productContract.on("LogNebulaApplicationRejected", logNebulaApplicationRejected)
    return productContract
  }

  const applyForPolicy = async () => {
    const contract = await getProductContract()
    const { age, gender } = details.basicInfo;
    const { sumAssured } = details.product
    const { address } = details.nominee
    const g = gender == "male" ? 1 : gender == "female" ? 2 : 3
    const addr = ethers.utils.getAddress(address)
    let tx = await contract.applyForPolicy(walletAddress, Number(age), g, addr, "LIFE", Number(sumAssured * 1000000))
    await tx.wait();
  }

  const isNextDisabled = () => {
    if (activeTab == "5") {
      return true
    }
    if (activeTab == "1") {

      if (!isBasicInfoFilled()) {
        return true
      }

    }

    if (activeTab == "3") {
      if (!isNomineeFilled()) {
        return true
      }
    }

    if (activeTab == "5") {
      if (!isPaymentFilled()) {
        return true
      }
    }




    return false;


  }


  const handleNext = () => {
    const newTab = +activeTab + 1
    setActiveTab(newTab + "")
  }
  const handlePrev = () => {
    const newTab = +activeTab - 1
    setActiveTab(newTab + "")
  }
  return (
    <div className='NB-BasicDetails'>
      <BasicDetailsContext.Provider value={{ details, setDetails }}>


        <div className='NB-BasicDetails__container'>

          <NebulaTabs onTabSelect={onTabSelect} activeTab={activeTab} />
          {activeTab == "1" && (
            <div className='NB-Basic-details__text NB-Basic-details__text--left'>
              <div>
                Let’s get to know you better to offer you the best insurance
              </div>
              <div className='subtitle'>
                Make sure to fill the details appropriately in order to have a smooth claim process
              </div>
            </div>
          )}
          {activeTab == "3" && (
            <div className='NB-Basic-details__text NB-Basic-details__text--left'>
              Add Nominee
            </div>
          )}
          <div className='NB-Basic-Details__content'>
            {renderContent()}
          </div>
          <div className='NB-Basic-details__actions'>
            {/* <Button
              onClick={handlePrev}
              disabled={activeTab == "1"}
              type="default" shape='round' className='NB-Basic-details__actions__prev' size="large">Previous</Button> */}

            <NBButton
              handleClick={handlePrev}
              disabled={activeTab == "1"}
              type="default" shape='round' classes='NB-Basic-details__actions__prev' size="large">Previous</NBButton>
            {/* {activeTab != 5 && <Button
              onClick={handleNext}
              disabled={isNextDisabled()}
              shape='round' className='NB-Basic-details__actions__next' type="primary" size="large">
              Next
            </Button>} */}
            {activeTab != 5 && <NBButton
              handleClick={handleNext}
              disabled={isNextDisabled()}
              shape='round' classes='NB-Basic-details__actions__next btn-gradient' type="primary" size="large">
              Next
            </NBButton>}
            {/* {activeTab == 5 && !approved && <Button
              onClick={handleApprove}
              disabled={isApproving || !isApproveEnabled()}
              loading={isApproving}
              shape='round' className='NB-Basic-details__actions__next' type="primary" size="large">
              Approve
            </Button>} */}
            {activeTab == 5 && !approved && <NBButton
              handleClick={handleApprove}
              disabled={isApproving || !isApproveEnabled()}
              loading={isApproving}
              shape='round' classes='NB-Basic-details__actions__next btn-gradient' type="primary" size="large">
              Approve
            </NBButton>}
            {activeTab == 5 && approved && <NBButton
              shape='round'
              classes='NB-Basic-details__actions__next btn-gradient'
              type="primary"
              size="large"
              handleClick={handleTransfer}
              disabled={buyingPolicy}
              loading={buyingPolicy}
            >
              Buy Policy
            </NBButton>}
            {/* {activeTab == 5 && approved && <Button
              onClick={handleTransfer}
              disabled={buyingPolicy}
              loading={buyingPolicy}
              shape='round' className='NB-Basic-details__actions__next' type="primary" size="large">
              Pay
            </Button>} */}

          </div>

        </div>
      </BasicDetailsContext.Provider>

    </div>
  )
}

export default BasicDetails