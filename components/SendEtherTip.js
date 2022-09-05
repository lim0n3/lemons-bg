import React from 'react';

import { BigNumber } from 'ethers';
import { useAccount, usePrepareSendTransaction, useSendTransaction } from 'wagmi';

const SendEtherTip = () => {
  const { isDisconnected } = useAccount();
  const { config } = usePrepareSendTransaction({
    request: { to: 'limone.eth', value: BigNumber.from('10000000000000000') },
  });
  const { sendTransaction } = useSendTransaction(config);
  return (
    <div>
      <button
        disabled={!sendTransaction || isDisconnected}
        onClick={() => sendTransaction?.()}
        type="button"
        className="mr-2 mb-2 inline-flex items-center rounded-lg bg-gray-100 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none"
      >
        <svg
          className="mr-2 -ml-1 h-4 w-4 text-[#626890]"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="ethereum"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
          />
        </svg>
        Send 0.01 $ETH tip
      </button>
      {isDisconnected ? <div className="text-center text-red-600">Connect wallet first!</div> : ''}
    </div>
  );
};

export default SendEtherTip;
