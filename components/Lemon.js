import axios from 'axios';
import { saveAs } from 'file-saver';
import Image from 'next/image';

const Lemon = (props) => {
  const { id, title, imgWidth, imgHeight, imgUrl } = props;
  const [width, height] = [imgWidth, imgHeight];
  const downloadImage = async () => {
    const response = await axios.post('/api/images', { imgUrl, width, height });
    saveAs(`data:image/png;base64,${response.data.data}`, `${title}-bg.png`);
  };
  return (
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
  );
};

export default Lemon;
