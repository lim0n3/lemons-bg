import { useEffect, useState } from 'react';

import axios from 'axios';
import { useAccount, useNetwork } from 'wagmi';

import Lemon from './Lemon';
import LoadingSpinner from './LoadingSpinner';

const phones = [
  {
    name: 'iPhone SE',
    width: 640,
    height: 1136,
  },
  {
    name: 'iPhone 6',
    width: 750,
    height: 1134,
  },
  {
    name: 'iPhone 6s',
    width: 750,
    height: 1134,
  },
  {
    name: 'iPhone 6 Plus',
    width: 1080,
    height: 1920,
  },
  {
    name: 'iPhone 6s Plus',
    width: 1080,
    height: 1920,
  },
  {
    name: 'iPhone 7',
    width: 750,
    height: 1134,
  },
  {
    name: 'iPhone 7 Plus',
    width: 1080,
    height: 1920,
  },
  {
    name: 'iPhone 8',
    width: 750,
    height: 1334,
  },
  {
    name: 'iPhone 8 Plus',
    width: 1080,
    height: 1920,
  },
  {
    name: 'iPhone X',
    width: 1125,
    height: 2436,
  },
  {
    name: 'iPhone XS',
    width: 1125,
    height: 2436,
  },
  {
    name: 'iPhone XS Max',
    width: 1242,
    height: 2688,
  },
  {
    name: 'iPhone XR',
    width: 828,
    height: 1792,
  },
  {
    name: 'iPhone 11',
    width: 828,
    height: 1792,
  },
  {
    name: 'iPhone 11 Pro',
    width: 1125,
    height: 2436,
  },
  {
    name: 'iPhone 11 Pro Max',
    width: 1242,
    height: 2688,
  },
  {
    name: 'iPhone SE 2nd gen',
    width: 750,
    height: 1334,
  },
  {
    name: 'iPhone 12 Pro',
    width: 1170,
    height: 2532,
  },
  {
    name: 'iPhone 12 Pro Max',
    width: 1284,
    height: 2778,
  },
  {
    name: 'iPhone 12 mini',
    width: 1080,
    height: 2340,
  },
  {
    name: 'iPhone 12',
    width: 1170,
    height: 2532,
  },
  {
    name: 'iPhone 13 mini',
    width: 1080,
    height: 2340,
  },
  {
    name: 'iPhone 13',
    width: 1170,
    height: 2532,
  },
  {
    name: 'Samsung Galaxy Note',
    width: 800,
    height: 1280,
  },
  {
    name: 'Samsung Galaxy Note 2',
    width: 720,
    height: 1280,
  },
  {
    name: 'Samsung Galaxy Note 3',
    width: 1080,
    height: 1920,
  },
  {
    name: 'Samsung Galaxy Note 4',
    width: 1440,
    height: 2960,
  },
  {
    name: 'Samsung Galaxy Note 8',
    width: 1440,
    height: 2960,
  },
  {
    name: 'Samsung Galaxy Nexus',
    width: 720,
    height: 1200,
  },
  {
    name: 'Samsung Galaxy S',
    width: 480,
    height: 800,
  },
  {
    name: 'Samsung Galaxy S2',
    width: 480,
    height: 800,
  },
  {
    name: 'Samsung Galaxy S3 mini',
    width: 480,
    height: 800,
  },
  {
    name: 'Samsung Galaxy S3',
    width: 720,
    height: 1280,
  },
  {
    name: 'Samsung Galaxy S4 mini',
    width: 540,
    height: 960,
  },
  {
    name: 'Samsung Galaxy S4',
    width: 1080,
    height: 1920,
  },
  {
    name: 'Samsung Galaxy S5',
    width: 1080,
    height: 1920,
  },
  {
    name: 'Samsung Galaxy S6',
    width: 1440,
    height: 2560,
  },
  {
    name: 'Samsung Galaxy S7, S7 edge',
    width: 1440,
    height: 2560,
  },
  {
    name: 'Samsung Galaxy S8',
    width: 1440,
    height: 2560,
  },
  {
    name: 'Samsung Galaxy S8+',
    width: 1440,
    height: 2560,
  },
];

// Make sure that this component is wrapped with ConnectKitProvider
const LemonList = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const [nfts, setNfts] = useState([]);
  const [nftsLoaded, setNftsLoaded] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  useEffect(() => {
    async function fetchNfts() {
      try {
        const response = await axios.get(`/api/nfts?address=${address}`);
        setNfts(response.data);
        setNftsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    }
    fetchNfts();
  }, []);

  const handleSelect = (event) => {
    const [w, h] = event.target.value.split('x');
    setWidth(w);
    setHeight(h);
  };

  if (isConnecting) return <div className="text-center">Connecting...</div>;
  if (isDisconnected)
    return <div className="text-center">Please connect your wallet and select one of your Little Lemon Friends!</div>;

  if (chain.id !== 1) {
    return <div className="text-center">Please switch to Ethereum Mainnet</div>;
  }
  if (nfts?.length > 0 && nftsLoaded) {
    return (
      <div>
        <div>
          <div>
            <label htmlFor="phones" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400">
              Select your phone size and click on one of your Lemons
            </label>
            <select
              id="phones"
              onChange={handleSelect}
              defaultValue="828x1792"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              {phones.map((phone) => (
                <option
                  key={`phone-${phone.name.replace(/ /g, '-').toLowerCase()}`}
                  value={`${phone.width}x${phone.height}`}
                >
                  {phone.name} ({phone.width} x {phone.height})
                </option>
              ))}
            </select>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="width" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                Width
              </label>
              <input
                type="text"
                id="width"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="828"
                onChange={(e) => setWidth(e.target.value)}
                value={width ?? 828}
                required={true}
              />
            </div>
            <div>
              <label htmlFor="height" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                Height
              </label>
              <input
                type="text"
                id="height"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={(e) => setHeight(e.target.value)}
                value={height ?? 1792}
                required={true}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-4">
          {nfts.map((nft) => (
            <Lemon
              key={parseInt(nft.id.tokenId, 16)}
              id={parseInt(nft.id.tokenId, 16)}
              title={nft.title}
              imgWidth={width || 828}
              imgHeight={height || 1792}
              imgUrl={nft.metadata.image}
            />
          ))}
        </div>
      </div>
    );
  }
  if (nfts?.length === 0 && nftsLoaded) {
    return (
      <div className="text-center">
        Unfortunately you do not own any Little Lemon Friends :( <br /> Check out{' '}
        <a
          href="https://opensea.io/collection/little-lemon-friends"
          target="_blank"
          rel="noreferrer"
          className="font-bold text-blue-700 underline"
        >
          the collection
        </a>{' '}
        and buy your first one!
      </div>
    );
  }
  return <LoadingSpinner />;
};

export default LemonList;
