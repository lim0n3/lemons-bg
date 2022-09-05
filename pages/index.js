import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from 'connectkit';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { WagmiConfig, createClient, chain } from 'wagmi';

import FollowOnTwitter from '../components/FollowOnTwitter';
import Footer from '../components/Footer';
import LemonList from '../components/LemonList';
import SendEtherTip from '../components/SendEtherTip';
import WalletInfo from '../components/WalletInfo';

const infuraId = process.env.INFURA_ID;

const client = createClient(
  getDefaultClient({
    appName: 'Your App Name',
    infuraId,
    chains: [chain.mainnet],
  })
);

const App = () => (
  <div className="m-5">
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 grid-rows-5 gap-5">
            <div className="row-span-5 text-center">
              <h1 className="mb-5 text-center text-3xl font-bold">
                Get your{' '}
                <a
                  className="text-yellow-500 underline"
                  href="https://opensea.io/collection/little-lemon-friends"
                  target="_blank"
                  rel="noreferrer"
                >
                  LittleLemonFriends
                </a>{' '}
                phone background!
              </h1>
              <Image alt="preview-gif" src="/assets/lemons.gif" height={170} width={340} />
            </div>
            <div className="row-span-3">
              <div className="mx-auto flex justify-center">
                <ConnectKitButton />
              </div>
              <div className="mx-auto mt-2 flex justify-center">
                <WalletInfo />
              </div>
            </div>
            <div className="row-span-3">
              <LemonList />
            </div>
            <div className="row-span-3">
              <div className="flex justify-center">
                <SendEtherTip />
                <FollowOnTwitter />
              </div>
            </div>
            <div className="row-span-6">
              <Footer />
            </div>
          </div>
        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  </div>
);

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
