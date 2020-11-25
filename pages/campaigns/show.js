import React,{Component} from 'react';
import Layout from '../../components/layout';
import Campaign from '../../ethereum/Campaign';
import {Card,Grid,Button} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';
class CampaignShow extends Component{
  //props.query.something     ! Here smething is routes that we add in route.js file
  static async getInitialProps(props){
    //console.log("address of campaign where it is deploy"+props.query.address);
    const campaign=Campaign(props.query.address);
    const summary=await campaign.methods.getSummary().call();
    //summary is Result object

    return {
            address:props.query.address,
            minimumContribution:summary['0'],
            campaignBalance:summary['1'],
            requestsCount:summary['2'],
            approversCount:summary['3'],
            manager:summary['4']
          };
    }

    renderCards(){
      const {campaignBalance,manager,minimumContribution,approversCount,requestsCount}=this.props;
      const items=[
        {
          header:manager,
          meta:'Address of manager ',
          description:'This manager created this campaign and able to create and finalize request to withdraw money',
          style:{overflowWrap:'break-word'}
        },
        {
          header:minimumContribution,
          meta:'Minimum Contribution (in Wei) for this Campaign ',
          description:'Pledge to give minimum '+minimumContribution+' wei to make this campaign successfull and become approver',
        },
        {
          header:requestsCount,
          meta:'Number of request',
          description:'A request tries to withdraw money from the contract .  Request must be approved by approvers',
        },
        {
          header:web3.utils.fromWei(campaignBalance,'ether'),
          meta:'Campaign balance(in ether)',
          description:'this campaign has funded  '+web3.utils.fromWei(campaignBalance,'ether') +' ether till now and manager allow to spent all money left ',
        },
        {
          header:approversCount,
          meta:'Number of approvers ',
          description:'Number of people who have already donated to this campaign'
        },
      ];
      return <Card.Group items={items}/>;
    }

  render(){
    return (
      <Layout>
        <h2>Campaign Details</h2>
        <Grid>
            <Grid.Row>
                <Grid.Column width={10}>
                    {this.renderCards()}
                </Grid.Column>
                <Grid.Column width={6}>
                      <ContributeForm address={this.props.address} minimumContribution={this.props.minimumContribution}/>
                </Grid.Column>
              </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                          <a>
                            <Button primary floated="left" >View Requests</Button>
                          </a>
                    </Link>
                  </Grid.Column>
            </Grid.Row>
          </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
