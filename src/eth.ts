import Web3 from 'web3';

const contractArtifact = require('../abi/PandaFace.json');
const nodeUrl = process.env.NODE_URL;
const contractAddress = process.env.CONTRACT_ADDRESS;
const creatorAddress = process.env.CREATOR_ADDRESS;
const creatorPrivKey = process.env.CREATOR_PRIV_KEY;

const web3 = new Web3(nodeUrl);
const contract = new web3.eth.Contract(contractArtifact.abi, contractAddress, {from: creatorAddress});
const account = web3.eth.accounts.wallet.add(web3.eth.accounts.privateKeyToAccount('0x' + creatorPrivKey));
web3.eth.defaultAccount = account.address;

async function sendTx(sender, amountToSendInWei, toCallFunc, errorFunc, gas, ...toCallArguments) {
  return new Promise(async (resolve, reject) => {
    try {
      gas = gas || 50000;
      const txParams = { gas, from: sender, value: amountToSendInWei, nonce: 0 };
      txParams.nonce = await web3.eth.getTransactionCount(sender, 'pending');
      const gasEstimate = await toCallFunc(...toCallArguments).estimateGas({ from: sender, value: amountToSendInWei });
      if (gas < gasEstimate)  { throw new Error('Gas is too low. Canceling sendTx()'); }
      const tx = toCallFunc(...toCallArguments).send(txParams);
      tx.on('transactionHash', txHash => resolve(txHash));
      tx.on('error', error => {
        console.log('Error at sendTx -> txError', error);
        errorFunc(error);
        return reject(error);
      });
    } catch (error) {
      console.log('Error at sendTx -> catch: ', error);
      errorFunc(error);
      return reject(error);
    }
  });
}

module.exports = {
  contract,
  sendTx,
  web3,
};
