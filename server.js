//We have to tell next js to use that routes file
//so purpose of server.js file is to manaually start up our next application
//and specifically tell it to use the routes that we defined inside routes.js file
const {createServer}=require('http');
const next = require('next')
const routes = require('./routes')
//new instance of next application is app
//dev=> development
//here dev specifies whether we are running our server in a production or a development mode

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app);
app.prepare().then(()=>{

  createServer(handler).listen(3000,(err)=>{
    if(err) throw err;
    //    console.log('Taiyaar ho is local host pr=>  local host:3000');
    console.log('Ready on localhost:3000');
  })
});
