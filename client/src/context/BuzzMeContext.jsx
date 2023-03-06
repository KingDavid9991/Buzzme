import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const buzzMeContext = React.createContext();

const { ethereum } = window;

const getBuzzMeContract = () =>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const buzzMeContract = new ethers.Contract(contractAddress, contractABI, signer);

    return buzzMeContract;

}

export const TransactionProvider = ({ children })=>{

    const [ currentAccount, setCurrentAccount ] = useState('');
    const [formData, setFormData] = useState("");
    const [amount, setAmount] = useState("");
    const [ transactions, setTransactions ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    

    const onSearchChange = event => {
        //console.log(event.target.value);
        setFormData(event.target.value);
    }
    const onSearchChange2 = event => {
        //console.log(event.target.value);
        setAmount(event.target.value);
    }

    const getAllBuzzMe = async () =>{
        try {
            if(!ethereum) return alert('Please install metamask');
            const transactionContract = getBuzzMeContract();

            const availableTransactions = await transactionContract.getAllBuzzme();
            console.log(availableTransactions);
            const structuredTransactions = availableTransactions.map((transaction)=>({
              getter: transaction.getter,
              buzzName: transaction.buzzName,
              amount: parseInt(transaction.amount._hex)/(10**18) 
            }));

            console.log(structuredTransactions);

            setTransactions(structuredTransactions);
        } catch (error) {
            console.log(error);
        }
    }


    const checkIfWalletIsConnected = async () =>{
        try {
          
            if(!ethereum) return alert('Please install metamask'); 

            const accounts = await ethereum.request({method: 'eth_accounts'});
    
            if (accounts.length){
                setCurrentAccount(accounts[0]);
    
                getAllBuzzMe();
            } else {
                console.log('No accounts found')
            }  
        } catch (error) {
            console.log(error);

            throw new Error('No ethereum object.');
        }

    }



    const connectWallet = async () => {
  
        try{
            if(!ethereum) return alert('Please install metamask');

            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
            window.location.reload()
        } catch (error){ 
            console.log(error); 

            throw new Error('No ethereum object.');
        }
    }

    const addBuzz = async () =>{

        try {
            if(!ethereum) return alert('Please install metamask');


            if( !formData ) return alert("input data is missing");
            
            const buzzMContract = getBuzzMeContract();
            const buzzme  = await buzzMContract.createBuzz( formData);
            setIsLoading(true);
            await buzzme.wait();
            setIsLoading(false);
            window.location.reload()
            // console.log(buzzme)  
       
        }   catch (error) {
            console.log(error);
            throw new Error('No ethereum object.'); 
        }

    }

    const deposit = async (_address, _buzzName) => {

        try {

            if(!ethereum) return alert('Please install metamask');

            if( !amount ) return alert("input data is missing");

            if(Math.sign(amount) == -1 || Math.sign(amount) == -0) return(
                alert("Invalid input!")
            );
            
            const parsedAmount = ethers.utils.parseEther(amount);

            const buzzMContract = getBuzzMeContract();
            const buzzme  = await buzzMContract.buzzMeEth( _address, _buzzName,{value:parsedAmount});
            buzzMContract.on("buzzBalance", async  function (evt) {
                getAllBuzzMe()
            })
            setIsLoading(true);
            await buzzme.wait();
            setIsLoading(false);
            window.location.reload()
            // console.log(buzzme)

        } catch (error) {
            console.log(error)
        }

    }

    const withdraw = async(address_getter,_buzzName) =>{

        try {
            if(!ethereum) return alert('Please install metamask');

            const buzzMContract = getBuzzMeContract();
            const buzzme  = await buzzMContract.withdrawBuzz( address_getter, _buzzName);
            setIsLoading(true);
            await buzzme.wait();
            setIsLoading(false);
            window.location.reload()
            // console.log(buzzme)
        } catch (error) {
            alert("contract interaction failure!");
        }

    }

   
    useEffect(()=>{
        checkIfWalletIsConnected();

    }, []);

    return (
        <buzzMeContext.Provider value={{ 
            connectWallet, 
            currentAccount,  
            addBuzz, 
            transactions,
            onSearchChange,
            onSearchChange2,
            deposit,
            withdraw,
            isLoading 
            }}>
            {children}
        </buzzMeContext.Provider>
    );
}

