import React, {Component} from 'react';
import { Card ,Button} from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/layout';
import {Link} from '../routes';
//import 'semantic-ui-css/semantic.min.css';
//but  next does not support css module ,so we don't use this above module
class CampaignIndex extends Component{
  //in any traditional react app or ptoject async componentDidMount() it is 100% appropiate  but we using next js
  //next js introduce one little extra requirement around data loading
  //The server side rendering attempt to render our Component on the server and take that all Html and send it to the browser
  //and we getting data in server side by this line (const campaigns=await factory.methods.getDeployedCampaigns().call())
  //next doesn't execute componentDidMount method ,so when our application is beign rendered by next on server
  //async componentDidMount() not run so we use getInitialProps()
  static async getInitialProps(){
      const campaigns=await factory.methods.getDeployedCampaigns().call();
      // return {campaigns:campaigns};
      return {campaigns};
  }
  //getInitialProps return an object and that object is going to be provided to our component as props
  //and use that in our component this.props.campaigns

  renderCampaigns(){
    //function(address) == (addres)=>  ==(or  we have single argument so) address=>
  // const items=this.props.campaigns.map(address=>{
  //   return{
  //     header:address,
  //     description:<a href="show">View Campaign</a>,
  //     fluid:true
  //   };
  // });

//              OR

  const items=this.props.campaigns.map(address=>{
    return{
      header:address,
      description:(
                  //<Link route={'/campaigns/'+address}>
                  <Link route={`/campaigns/${address}`}>
                      <a>View Campaign</a>
                  </Link>
                 ),
      fluid:true
    };
  });

  return <Card.Group items={items}/>;
  }

  //we have to write km se km chota jsx otherwise it will some error (in render() method)
  render(){
    return (
    <Layout>
    <div>
    <h2>Open Campaigns</h2>
    <Link route="/campaigns/new">
      <a>
        <Button
          floated='right'
          content="Create Campaign"
          icon="plus circle"
          primary
          labelPosition='right'
          />
        </a>
    </Link>
    {this.renderCampaigns()}

    </div>
    </Layout>
  );
  }
}

//we use<a></a> to create or show a new tab only

//page always except that file exports a react Component
export default CampaignIndex;


//component is reder both on the server and once everything looads up it's executed on the client side as well
//to test server side rendering by disabling javascript execution inside our browser
