import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { FaEhereum } from "react-icons/bi";
import { buzzMeContext } from "../context/BuzzMeContext";

const Inpute = ({placeholder, name, type, value, onSearchChange}) =>(
  <input placeholder={placeholder}  type={type} step='0.0001' value={value} 
  onChange={onSearchChange} 
  />
);



export default function Navbar() {

  const {onSearchChange,addBuzz,isLoading, transactions,currentAccount,connectWallet } = useContext(buzzMeContext);

  const buzzAdder = (e) =>{

    e.preventDefault();

    addBuzz();

  }

  return (
    <Nav>
      <div className="title">
        <h4></h4>
        <h1>
         <span>Buzz Me</span>
        </h1>

      </div>
      <div className="cont">
        {isLoading?(<h4>Please Wait!</h4>):(<button onClick={buzzAdder} className="btn2">Create Buzz</button>)}
        {currentAccount?(<div className="btn2">{currentAccount.slice(0, 20)}</div>):(<div>
          <button onClick={connectWallet} className="btn2">Connect Wallet</button>
        </div>)}
        <div className="search">
          <Inpute placeholder="buzz name" name="buzzName" type="text" onSearchChange={onSearchChange}/>
        </div>
      </div>

    </Nav>
  );
}
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  color: white;
  position:sticky;
  padding-left:20px;
  padding-right:20px;
  .payment3{
    display:flex;
    align-items:center;
    border-radius: 0.3rem;
    height: 30px;
    border-style:none;
    text-align: center;
    margin-top: 9px;
    
    padding: 0.3rem 1rem;
    color:#45f3ff;
    font-weight: 900;
    cursor:pointer;
    background:#4d5155;
    font-family: "Permanent Marker", cursive; 
  }


  .btn2{
    padding: 5px 20px;
    border-radius:5px;
    background:red; 
    outline:none;
    border:none;
    cursor:pointer;
  }

  .title {
    h1 {
      span {
        margin-left: 0.5rem;
        color: white;
        // font-family: "Permanent Marker", cursive;
        letter-spacing: 0.2rem;
      }
    }
  }



  .cont{
    display: flex;
    align-items: center;
    gap:10px;
  }

  .cont2{
    margin-right:10px
  }

  .search {
    background-color: white;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 8rem 1rem 1rem;
    border-radius: 1rem;
    svg {
      color: red;
    }
    input {
      background-color: transparent;
      border: none;
      color: red;
      
      
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: red;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    .title {
      h1 {
        span {
          display: block;

          margin: 1rem 0;
          /* letter-spacing: 0; */
        }
      }
    }
    .search{
      width:230.031px;
      padding-right:10px;
     
    }
  }
`;
