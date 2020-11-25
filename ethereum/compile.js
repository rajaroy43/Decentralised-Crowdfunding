//we always recompile our code(as in lottery.sol file ) it takes time (4-7 sec)
//to save that time ,we compile our code at one time ,and write output to the new
//file and then acess that compile version
const path = require("path");
const solc = require("solc");
//fs-extra improved version of require('fs') module
const fs = require("fs-extra");
const buildPath = path.resolve(__dirname, "build");
//delete all files which is under build folder
fs.removeSync(buildPath);
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf-8");
const output = solc.compile(source, 1).contracts;
//here output object contain two seperate object => 1. campaign compile 2. campaign_factory compile
fs.ensureDirSync(buildPath);
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
