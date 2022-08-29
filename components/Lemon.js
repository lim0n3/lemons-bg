import { useState } from 'react';

import axios from 'axios';
import { saveAs } from 'file-saver';
import Image from 'next/image';

const Lemon = (props) => {
  const { id, title, imgWidth, imgHeight, imgUrl } = props;
  const [width, height] = [imgWidth, imgHeight];
  const [downloading, setDownloading] = useState();
  const downloadImage = async () => {
    setDownloading(true);
    const response = await axios.post('/api/images', { imgUrl, width, height });
    saveAs(`data:image/png;base64,${response.data.data}`, `${title}-bg.png`);
    setDownloading(false);
  };
  return (
    <div className="relative rounded">
      <div
        className={downloading ? 'z-10 bg-gray-100 bg-opacity-60' : ''}
        style={downloading ? { width: 150, height: 150, position: 'absolute' } : { width: 0, height: 0 }}
      >
        {downloading ? (
          <div className="mt-10 animate-bounce text-center">
            <div role="status">
              <span>Downloading...</span>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <button type="button">
        <Image
          className="rounded"
          id={`nft-${id}`}
          src={imgUrl}
          alt="nft"
          width={150}
          height={150}
          onClick={downloadImage}
        />
      </button>
    </div>
  );
};

export default Lemon;
