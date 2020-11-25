import Web3 from "web3";
//our code 1st get executed on the next server
//window is global variable that is availabe only browser
//window is not availabe on node js (whisch is where our server is currently running)
//so we don't acess window right now and it show error that => window is not defined
//mostly peope don't use metamask ,so how to cope up with these currentProvider(metamask)
//we directly link nest js to ethereum network and do some initial calls and we goind to do some data fetching
//before we produce HTML Document to send user browser,it doesn't matter whether or not user installed metamask
//it doesn't matter or not they even have acess to ethereum network because we have already fetch that data and
//send them HTML document with all information already contained inside of it
//by using next js which directly connect to ethereum network so they have to don't care about metamask and rinkeby and any other network

// const provider=window.web3.currentProvider;
// const web3=new Web3(provider);

// export default web3;
//this file exexute two times => 1. one time on the next js server to initially render our application
//2. second time inside the browser

//now we remove this error

let web3;
//to check our code is inside our browser (and metamask is availabe)  or not use typeof window
//if yes then it(typeof window ) return object otherwise it return undefinded
//to check metamask installed(or injected web3 ) use => window.web3
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //we are inside the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // we are on the server OR  user is not running metamask
  // here we use infura api  provider to making our own provider that is aceesing the network through URL

  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/45662a3729fa43678d13b210e60dee48"
  );
  web3 = new Web3(provider);
}
export default web3;
