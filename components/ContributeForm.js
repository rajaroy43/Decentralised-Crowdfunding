import React,{Component} from 'react';
import {Form,Input,Message,Button,Icon} from 'semantic-ui-react';
import Campaign from '../ethereum/Campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
class ContributeForm extends Component {

  state={
    value:'',
    loading:false,
    errorMessage:'',
    transaction_status_message_for_notched:'',
    message:''
  }

  onSubmit= async(event)=>{
    event.preventDefault();
    if(this.state.value<web3.utils.fromWei(this.props.minimumContribution,'ether')){
      window.alert("Please give  minimum contribution as given");
      return ;
    }
    const campaign=Campaign(this.props.address);
    this.setState({loading:true,transaction_status_message_for_notched:'Waiting on transaction success...',errorMessage:''})
    try {
      const accounts=await web3.eth.getAccounts();
      console.log(web3.eth.getBalance(accounts[0]));
      await campaign.methods.contribute().send({from:accounts[0],value:web3.utils.toWei(this.state.value,'ether')});
      this.setState({message:'You suceessfully contibute to this  campaign'});
      //To Refresh the page we use Router.replaceRoute() method
      Router.replaceRoute(`/campaigns/${this.props.address}`);

    }
    catch (error) {
      this.setState({message:'Transaction failed',errorMessage:'Hey your metamask is not allow to complete the transaction !'+error.message});
}
this.setState({loading:false,value:'',message:''});
  }
  render(){
      return(
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Input
          min="0"
          step="any"
          type="number"
          pattern="[0-9]"
          label=<h3>Ammount to Contibute</h3>
          style={{width:"150px"}}
          placeholder="Ammount in ether"
          value={this.state.value}
          onChange={(event)=>this.setState({value:event.target.value})}
        />
        <Button loading={this.state.loading} primary>Contribute</Button>
        <h2>{this.state.message}</h2>
        <Message error style={{width:'520px'}}  header="Oops!" content={this.state.errorMessage}/>
        <Message icon hidden={!this.state.loading} positive>
        <Icon name='circle notched' loading />
        <Message.Content>{this.state.transaction_status_message_for_notched}</Message.Content>
        </Message>
      </Form>
    );
  }

}

export default ContributeForm;
