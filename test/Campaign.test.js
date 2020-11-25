//here test may be related to ethereum side and  other might be related to web appplication side!!
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3=require('web3');
const web3=new Web3(ganache.provider());

const compiledFactory=require('../ethereum/build/CampaignFactory.json');
const compiledCampaign=require('../ethereum/build/Campaign.json');

let accounts;
//factory=>  refrence to the deployed instance of the factory that we gonna make
let factory;
let campaign;
let campaignAddress;
beforeEach(async()=>{
//mostly we need instance of a Campaign
//so rather we use factory inside of every it() block to create seperate instance of a Campaign we use  Campaign
  accounts=await web3.eth.getAccounts();
  factory=await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({data:compiledFactory.bytecode})
  .send({from:accounts[0],gas:1000000});
   await factory.methods.createCampaign(10).send({
    from:accounts[0],
    gas:1000000
  });
  //it is es2016 syntax
// const addresses=  await factory.methods.getDeployedCampaigns().call();
// campaignAddress=addresses[0];
//use es5 syntax
  [campaignAddress]=await factory.methods.getDeployedCampaigns().call();
//create actual  instance of campaign
//we use Web3 for instruct that will acess to address at  campaignAddress

campaign=await new web3.eth.Contract(JSON.parse(compiledCampaign.interface),campaignAddress);
});


describe('Campaigns',()=>{

  it('deploys a factory and a campaign',()=>{
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  //test campaign has manager of address mark as  account[0],because we
  //use account[0] to create instance of a campaignAddress
  //means manager os this campaign have account[0]
  //caller=> person who call createCampaign() method
  it('marks caller as the campaign manager',async()=>{
    const campaign_manager=await campaign.methods.manager().call();
    assert.equal(campaign_manager,accounts[0]);
  });


  it('Allows people to contribute money and mark them as approver',async()=>{

    await campaign.methods.contribute().send({value:200,from:accounts[1]});
    const is_Contributor=await campaign.methods.approvers(accounts[1]).call();
    //is_Contributor=false;
    //assert(is_Contributor);
    assert(is_Contributor);
});

  it('Requires a minimum contribution',async()=>{

try {
  await campaign.methods.contribute().send({value:100,from:accounts[1]});
//we use assert(false) because yeh wali line(campaign.methods.contribute()
//.send({value:10,from:accounts[1]});) chalne ke baad hum seedha catch block ke
//andar  aa jayenege and agar test fail hua it means try block ke andar hi the
  assert(false);
}
catch (error) {
  assert(error);
}

  });
it('only manager has the ability to make a payment request',async()=>{
  await campaign.methods.createRequest("batteries",100,accounts[1]).send({from:accounts[0],gas:1000000});
  const request=await campaign.methods.requests(0).call();
  assert.equal('batteries',request.description);

});

//now contribute,createRequest,approveRequest,finalizeRequest
it('process requests',async()=>{

  await campaign.methods.contribute().send({
    from:accounts[0],
    value:web3.utils.toWei('10','ether')
  });

  await campaign.methods
  .createRequest('A',5,accounts[1])
  .send({from:accounts[0],
        gas:1000000});

    await campaign.methods.approveRequest(0).send({from:accounts[0],gas:1000000});

    await campaign.methods.finalizeRequest(0).send({from:accounts[0],gas:1000000});

    //balance is a string that represent the ammounts of money that account has in wei
    let balance=await web3.eth.getBalance(accounts[1]);
    //now balance is in ether
    balance=web3.utils.fromWei(balance,'ether');
    //balance have sting value just in float type
    balance=parseFloat(balance);
    //in real all ganache accounts have 100 ether and we transfer 5 ether to finalize
    //so we use 99.+5>104
    assert(balance>104);
});
});
