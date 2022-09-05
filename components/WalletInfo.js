import { useAccount, useNetwork } from 'wagmi';

const WalletInfo = () => {
  const { isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();

  if (isConnecting) return <div className="text-center">Connecting...</div>;
  if (isDisconnected)
    return <div className="text-center">Please connect your wallet and select one of your Little Lemon Friends!</div>;

  if (chain.id !== 1) {
    return <div className="text-center">Please switch to Ethereum Mainnet</div>;
  }
};

export default WalletInfo;
