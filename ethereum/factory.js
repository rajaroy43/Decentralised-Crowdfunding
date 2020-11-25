import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
const instance=new web3.eth.Contract(
              JSON.parse(CampaignFactory.interface),
            '0x29D78175E92D51Bf805857ae18db5e0851eA8016'
          );
export default instance;
