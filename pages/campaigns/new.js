import React,{Component} from 'react';
import Layout from '../../components/layout';
import {Button,Form,Input,Message,Icon} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';
//Link object is a react components that allow us to render <a></a> into our react
// components and navigate arround the application

//Router object allow us to programatically redirect people from one page to another CampaignNew
//inside our application
class CampaignNew extends Component{
  state={
    minimumContribution:'',
    errorMessage:'',
    loading:false,

    realMessage:''
  };
  //whenever we do form submittal in the browser ,the browser is going to
  //attempt automatically submit the form to back end server and this thing we do not want to have
  //to stop this we use = preventDefault()
   onSubmit=async (event)=>{
     this.setState({loading:true,errorMessage:'',realMessage:''});
      event.preventDefault();
      try
      {
        const accounts=await web3.eth.getAccounts();
        await factory.methods.createCampaign(this.state.minimumContribution)
        .send({
          from:accounts[0]
        });
        this.setState({realMessage:'You suceessfully created the campaign'});
        Router.pushRoute('/');
    }
    catch(error)
    {
      this.setState({errorMessage:'Hey your metamask is not allow to complete the transaction'});

  }
  //After succeesfully exit this function we have to stop that loading
  this.setState({loading:false});
}
  render(){
    return (
      <Layout>
        <Message
        info
        header='Hint'
        content='Hey!!This contract is developed on the ethereum blockchain so ,it only support decimal value'
        style={{width:'620px'}}
        >
        </Message >
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <h2>Create a Campaign</h2>
        <Form.Input
          min="1"
          type="number"
          pattern="[0-9]"
          floating='true'
          label='Minimum Contribution'
          style={{width:"150px"}}
          placeholder="Ammount in wei"

          value={this.state.minimumContribution}
          onChange={(event)=>this.setState({minimumContribution:event.target.value})}
          />
          <Button loading={this.state.loading} primary type='submit' >Create  </Button>
          <h2>{this.state.realMessage}</h2>
          <Message style={{width:"500px"}}error header="Oops !" content ={this.state.errorMessage}/>

        </Form>
      </Layout>

      );
}
}

export default CampaignNew;
