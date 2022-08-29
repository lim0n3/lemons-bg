import { readFileSync } from 'fs';
import { join, resolve } from 'path';

import { withSentry } from '@sentry/nextjs';
import chromium from 'chrome-aws-lambda';
import Jimp from 'jimp';
import nodeHtmlToImage from 'node-html-to-image';

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
    const img = await nodeHtmlToImage({
      type: 'jpeg',
      html: templateFile,
      quality: 100,
      content: {
        height: h,
        width: w,
        overlayHeight,
        bgColor: hex,
        lemonImgUrl: imgUrl,
      },
      puppeteerArgs: {
        ...(process.env.ENV === 'production'
          ? {
              args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
              executablePath: await chromium.executablePath,
            }
          : {}),
        defaultViewport: {
          height: h,
          width: w,
          deviceScaleFactor: 2,
        },
      },
    });
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename=bg.png');
    res.json({ data: img.toString('base64') });
    return;
  }
  res.status(400).json({ message: 'Bad Request' });
};

export default withSentry(handler);
