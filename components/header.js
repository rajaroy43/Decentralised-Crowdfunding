import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';
//if we use both Link tag and Menu.Item tag simultaneously then styles of these
//two components clashed with each other so rather usin <Menu.Item> tag we going
//to use only < Link> tag

//we know that Link tag will create automatic anchor tag(<a></a>)
//Link tag is a generic wrapper component that doesn't add any Html of it's own
//it's wraps its children with a click event handler ,so anyone clicks on any of it's
//children it automatically navigate the user around the page

export default () =>{
  return (
      <Menu style={{marginTop:'30px'}}>
        <Link route="/">
        <a className="item"><h3> RayCampaign</h3></a>
        </Link>

        <Menu.Menu position='right'>
        <Link route="/">
        <a className="item"><h3>All Campaigns</h3></a>
        </Link>
        <Link route="/campaigns/new">
        <a className="item"><h3> + </h3></a>
        </Link>


        </Menu.Menu>
      </Menu>

);
}
