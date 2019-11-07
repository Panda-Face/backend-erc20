import Express from 'express';
// import * as Eth from "../eth";
const Eth = require('../eth');

const router = Express.Router();

router.post('/mint/', async (req, res) => {
  try {
    const amount = parseFloat(req.body.amount);
    const address = req.body.address;
    if (!Eth.web3.utils.isAddress(address)) { throw new Error('Invalid address'); }
    const txMint = await Eth.sendTx(
      process.env.CREATOR_ADDRESS,
      0,
      Eth.contract.methods.mint,
      (error) => console.log(error),
      80000,
      address,
      (amount * 100).toString(),
    );
    console.log(`New minting: ${amount} PandaFace to ${address}`);
    res.json({ txhash: txMint, address, amount });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/burn/', async (req, res) => {
  try {
    const amount = parseFloat(req.body.amount);
    const address = req.body.address;
    if (!Eth.web3.utils.isAddress(address)) { throw new Error('Invalid address'); }
    const txMint = await Eth.sendTx(
      process.env.CREATOR_ADDRESS,
      0,
      Eth.contract.methods.burn,
      (error) => console.log(error),
      80000,
      address,
      (amount * 100).toString(),
    );
    console.log(`New burn: ${amount} PandaFace from ${address}`);
    res.json({ txhash: txMint, address, amount });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/seize/', async (req, res) => {
  try {
    const amount = parseFloat(req.body.amount);
    const addressFrom = req.body.addressFrom;
    const addressTo = req.body.addressTo;
    if (!Eth.web3.utils.isAddress(addressFrom)) { throw new Error('Invalid address'); }
    if (!Eth.web3.utils.isAddress(addressTo)) { throw new Error('Invalid address'); }
    const txMint = await Eth.sendTx(
      process.env.CREATOR_ADDRESS,
      0,
      Eth.contract.methods.seize,
      (error) => console.log(error),
      80000,
      addressFrom,
      addressTo,
      (amount * 100).toString(),
    );
    console.log(`New seize: ${amount} PandaFace from ${addressFrom} send to ${addressTo}`);
    res.json({ txhash: txMint, addressFrom, addressTo, amount });
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
