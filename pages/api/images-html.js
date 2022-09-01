import { readFileSync } from 'fs';
import { join, resolve } from 'path';

import { withSentry } from '@sentry/nextjs';
import Handlebars from 'handlebars';
import Jimp from 'jimp';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { imgUrl, width, height } = req.body;
    // Process a POST request
    const image = await Jimp.read(imgUrl);
    const templateDirectory = resolve(process.cwd(), 'public');
    const templateFile = readFileSync(join(templateDirectory, 'assets', 'bg-template.handlebars'), 'utf8');
    const hex = `#${image.getPixelColor(0, 0).toString(16).substring(0, 6)}`;
    const w = parseInt(width, 10) ?? 828;
    const h = parseInt(height, 10) ?? 1792;
    const overlayHeight = parseInt(w / 6.6, 10);
    const template = Handlebars.compile(templateFile);
    const html = template({
      height: h,
      width: w,
      overlayHeight,
      bgColor: hex,
      lemonImgUrl: imgUrl,
    });
    res.json({ html });
    return;
  }
  res.status(400).json({ message: 'Bad Request' });
};

export default withSentry(handler);
