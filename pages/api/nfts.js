import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { withSentry } from '@sentry/nextjs';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { address } = req.query;
    const web3 = createAlchemyWeb3(`https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`);
    const response = await web3.alchemy.getNfts({ owner: address, withMetadata: true });
    res.json(response.ownedNfts.filter((nft) => nft.contract.address === '0x0b22fe0a2995c5389ac093400e52471dca8bb48a'));
    return;
  }
  res.status(400).json({ message: 'Bad Request' });
};

export default withSentry(handler);
