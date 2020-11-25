const HdWalletProvider=require('truffle-hdwallet-provider');
const Web3=require('web3');
const compiledFactory=require('../ethereum/build/CampaignFactory.json');
const provider=new HdWalletProvider(
  'jeans toast bone embody tortoise trophy often amazing split into robust fortune',

'https://rinkeby.infura.io/v3/45662a3729fa43678d13b210e60dee48'
);
const web3=new Web3(provider);
const deploy=async()=>{
  const accounts=await web3.eth.getAccounts();
  console.log('Attempting to deploy from account',accounts[0]);
  const factory=await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({data:'0x'+compiledFactory.bytecode})
  .send({from:accounts[0],
          gas:1000000
  });
  console.log("Contract deployed to "+factory.options.address);
}

deploy();
provider.engine.stop();
