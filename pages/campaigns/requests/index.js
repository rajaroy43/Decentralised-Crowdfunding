import React, { Component } from "react";
import Layout from "../../../components/layout";
import { Button, Table, Divider, Message } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/Campaign";
import RequestRow from "../../../components/RequestRow";
//In solidity we do not return array of struct
class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    //we will iterate or loop up to requestCount in All promise
    //not one by one

    //getRequestsCount returns a number inside a string, but the Array  constructor
    // expects to be passed a number, not a string. To fix this, we can use the parseInt
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
    return { address, requests, requestCount, approversCount };
  }
  renderRow() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          id={index}
          key={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }
  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <Message
          info
          header="Information alert"
          content="You only finalize the request when you get more than 50% vote "
          style={{ width: "620px" }}
        />
        <h2>Pending Requests</h2>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button floated="right" primary style={{ marginBottom: 30 }}>
              {" "}
              Add Request
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Ammount(in ether)</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
        <h3>Found {this.props.requestCount} request .</h3>
      </Layout>
    );
  }
}

export default RequestIndex;
