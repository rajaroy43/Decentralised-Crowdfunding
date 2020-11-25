import React,{Component} from 'react';
import Layout from '../../../components/layout';
import {Form,Button,Message,Input,TextArea,Icon} from 'semantic-ui-react';
import Campaign from '../../../ethereum/Campaign';
import web3 from '../../../ethereum/web3';
import {Link,Router} from '../../../routes';
class RequestNew extends Component{
  state={
        description:'',
        ammount_transfer:'',
        recipient:'',
        loading:false,
        errorMessage:'',
        message:''
}
 onSubmit=async(event)=>{
   event.preventDefault();
  this.setState({loading:true,errorMessage:'',message:''});

  const campaign=Campaign(this.props.address);
  const {description,ammount_transfer,recipient}=this.state;
  try {
    const accounts=await web3.eth.getAccounts();
    await campaign.methods.createRequest(description,web3.utils.toWei(ammount_transfer,'ether'),recipient).send({from:accounts[0]});
    this.setState({message:'You sucessfully create the request'});
    Router.pushRoute(`/campaigns/${this.props.address}/requests/`);
}
  catch (error) {
  
      this.setState({errorMessage:'Hey your metamask is not allow to complete the transaction !  '+error.message})
  }
this.setState({loading:false});
}
  static async getInitialProps(props){
    const {address}=props.query;
    return {address};
  }
  render(){
    return (
      <Layout>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Link route={`/campaigns/${this.props.address}/requests`}>
              <a><h3>Back</h3></a>
              </Link>
              <h1>Create a request</h1>
              <Form.TextArea

              label='Description'
              placeholder="what this request for ?"
              value={this.state.description}
              onChange={event=>this.setState({description:event.target.value})}
              />

              <Form.Input

              label="Recipient Account"
              placeholder="Address of recipient who got money"
              value={this.state.recipient}
              onChange={event=>this.setState({recipient:event.target.value})}
              />
              <Form.Input

                pattern="[0-9]"
                type="number"
                step="any"
                label="Ammount transfer (in ether)"
                style={{width:"250px"}}
                placeholder="Ammount in ether "
                value={this.state.ammount_transfer}
                onChange={event=>this.setState({ammount_transfer:event.target.value})}
               />
              <Button loading={this.state.loading} floated="left" primary>Add request</Button>
              <br/>
              <h2>{this.state.message}</h2>
              <Message error header="Oops! "content={this.state.errorMessage} />

              </Form>
      </Layout>
    );
  }
}
export default RequestNew;
