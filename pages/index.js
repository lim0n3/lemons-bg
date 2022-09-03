import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from 'connectkit';
import dynamic from 'next/dynamic';
import { WagmiConfig, createClient, chain } from 'wagmi';

import FollowOnTwitter from '../components/FollowOnTwitter';
import Footer from '../components/Footer';
import LemonList from '../components/LemonList';
import SendEtherTip from '../components/SendEtherTip';

const infuraId = process.env.INFURA_ID;

const client = createClient(
  getDefaultClient({
    appName: 'Your App Name',
    infuraId,
    chains: [chain.mainnet],
  })
);

const App = () => (
  <div className="m-5 grid h-full grid-cols-1 grid-rows-2 content-between">
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 grid-rows-4 gap-5">
            <div className="row-span-3">
              <h1 className="text-center text-3xl font-bold">
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
            </div>
            <div className="row-span-3 mx-auto justify-center">
              <ConnectKitButton />
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
          </div>
        </div>
      </ConnectKitProvider>
    </WagmiConfig>
    <Footer />
  </div>
);

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
