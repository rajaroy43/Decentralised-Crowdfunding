const routes = require('next-routes')();
//it will return the function so we use parenthesis ()
// routes.add('...','...')
//we will set different dynamic routes that we nedd inside of our application
routes
.add('/campaigns/new','/campaigns/new')
.add('/campaigns/:address','/campaigns/show')
.add('/campaigns/:address/requests','/campaigns/requests/index')
.add('/campaigns/:address/requests/new','/campaigns/requests/new');
module.exports=routes;
