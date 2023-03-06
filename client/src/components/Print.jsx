import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { buzzMeContext } from "../context/BuzzMeContext";

const Inpute = ({placeholder, name, type, value, onSearchChange}) =>(
  <input placeholder={placeholder}  type={type} step='0.0001' value={value} 
  onChange={onSearchChange} className="input"
  />
);


export default function Print() {



  const { transactions,searchField,isLoading,onSearchChange2,deposit,withdraw } = useContext(buzzMeContext);


  const tipping = (e,param1,param2)=>{
    e.preventDefault();

    deposit(param1,param2);
  }

  const myBuzz = (e,param1,param2) =>{
    e.preventDefault();

    withdraw(param1,param2);
  }

  
  return (
    <Section>
      <div className="top">
        <div className="grid">
          { transactions.map((transaction)=>{
            return(
              <div className="card">
              <div className="cont1">
                  <div className="details">
                    <h3>{ transaction.buzzName }</h3>
                    <p>{ transaction.getter.slice(0, 20) }</p>
                    <p style={{color:"blue",fontSize:"17px"}}>{ transaction.amount }ETH</p>
                    <p>
                      <div className="deposit">
                        {isLoading?(<h4>Please Wait!</h4>):(<button className="btn2" onClick={event =>tipping(event,transaction.getter,transaction.buzzName)}>Deposit</button>)}<Inpute placeholder="buzz amount" name="buzzName" type="number" onSearchChange={onSearchChange2}/>
                      </div>
                    </p><br/>
                    <p>
                      {isLoading?(<h4>Please Wait!</h4>):(<button className="btn2" onClick={event =>myBuzz(event,transaction.getter,transaction.buzzName)}>
                        Withdraw
                      </button>)}
                    </p>
                  </div>
              </div>
              </div>
            )
          })}

        </div>
      </div>
      <div className="top2">

      </div>
    </Section>

  );
}

const Section = styled.section`
  //margin-left: 18vw;
  padding: 2rem;
  background:#262626;
  height:500px;
  display:flex;
  flex-direction:column;
  
  .grid {
    display:flex;
    flex-wrap:wrap;
    height:500px;
    gap: 1rem;
    margin-top: 2rem;
  }

  .btn2{
    padding: 5px 20px;
    border-radius:5px;
    background:red; 
    outline:none;
    border:none;
    cursor:pointer;
  }

  .deposit{
    display:flex;
  }
  
  .input{
    height:26px;
    margin-left:10px;
    &::placeholder {
      color: red;
    }
  }


  .top{
    display:flex;
    background:#262626;
  }
  top2{
    height:500px;
    background:#262626;
    align-content:flex-end;
  }
  .card{
    //padding: 1rem 2rem 3rem 2rem;
    border-radius: 1rem;
    // background: rgb(77,81,85);
    // background: linear-gradient(90deg, rgba(77,81,85,1) 6%, rgba(77,81,85,1) 100%);
    background: white;
    color: black;
    padding: 1rem;
    display: flex;
    flex-direction:column;
    //justify-content: space-evenly;
    //align-items: center;
    //gap: 1rem;
    transition: 0.5s ease-in-out;
    height:200px;
    width:270px;
    
  }

  .details{
    display:flex;
    flex-direction:column;
    h3{
      color:red;
    }
    p{

      margin-top:-10px;
      font-weight:bold;
      font-size:13px;
      
       
    }
  }
  .image{
    border-radius:50%;
    width:50px;
    height:50px;
    img{
      border-radius:50%;
      width:100%;
      height:100%;
    }
  }
  .cont1{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .cont2{
    display:flex;
    justify-content:space-between;
    align-items:center;
    button{
      border-radius:5px;
      padding:10px 20px;
      border:none;
      outline:none;
      background:#45f3ff;
      cursor:pointer;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    // margin-left: 0;
    height:500px;
    background:#262626;
    
  }
`;
