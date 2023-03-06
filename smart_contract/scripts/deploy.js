
const main = async () => {


  const BuzzMe = await hre.ethers.getContractFactory('BuzzMe'); //this is like a function factory or a class that is going to generate instances of that specific contract;
  const transactions = await BuzzMe.deploy();

  await transactions.deployed();

 

  console.log("Transactions deployed to:", transactions.address);
  //Transactions deployed to: 0x32024E4276755bC45FF70836B96D773134d9B67d
  
  
}


const runMain = async () =>{
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();