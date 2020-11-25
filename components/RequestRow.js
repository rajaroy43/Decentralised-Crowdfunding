import React ,{Component} from 'react';
import {Table,Button} from 'semantic-ui-react';
import  web3 from '../ethereum/web3';
import Campaign from '../ethereum/Campaign';
import {Router} from '../routes';
class RequestRow extends Component{
  state={
    loading1:false,
    loading2:false
  }
  onApprove=async()=>{
    this.setState({loading1:true});
    const campaign=Campaign(this.props.address);
    const accounts=await web3.eth.getAccounts();
    try{
    await campaign.methods.approveRequest(this.props.id).send({from:accounts[0]});}
    catch(error){

  }
  this.setState({loading1:false});
  Router.replace(`/campaigns/${this.props.address}/requests`);
  }
  onFinalize=async()=>{
    this.setState({loading2:true});
    const campaign=Campaign(this.props.address);
    const accounts=await web3.eth.getAccounts();
    try{
    await campaign.methods.finalizeRequest(this.props.id).send({from:accounts[0]});
  }
    catch(error){

  }
    this.setState({loading2:false});
Router.replace(`/campaigns/${this.props.address}/requests`);
  }
  render(){
    const{Row,Cell}=Table;
    const{id,request,approversCount}=this.props;
    const readyTOFinalize=request.approvalCount>approversCount/2;
    return (
      <Row disabled={request.complete} positive={readyTOFinalize && !request.complete}>
        <Cell>{id+1}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value,'ether')} </Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount}/{approversCount}</Cell>
        <Cell><Button disabled={request.complete}  loading={this.state.loading1}  color="green" basic onClick={this.onApprove}>Approve</Button></Cell>
        <Cell><Button disabled={request.complete}  loading={this.state.loading2} color="teal" basic onClick={this.onFinalize}>Finalize</Button></Cell>
      </Row>);
  }
}
export default RequestRow;
