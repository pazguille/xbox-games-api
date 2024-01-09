const axios = require('axios');
const sharp = require('sharp');

// https://store-images.s-microsoft.com/image/apps.3458.14519454624678828.1302cdcc-5bca-4ad4-9d5f-5610ae87cd80.0060eafa-b18a-4e2e-b30b-17de3326c7f1
// https://xbox-games-api.vercel.app/api/image/apps.3458.14519454624678828.1302cdcc-5bca-4ad4-9d5f-5610ae87cd80.0060eafa-b18a-4e2e-b30b-17de3326c7f1

module.exports = async (req, res) => {
  const path = req.params.path || req.query.path;
  delete req.query.path;
  const queryString = new URLSearchParams(req.query).toString();
  const microsoft = `https://store-images.s-microsoft.com/image/${path}?${queryString}`;
  const response = await axios.get(microsoft, { responseType: 'arraybuffer' });

  const format = req.headers.accept.includes('image/webp') ? 'webp' : 'jpeg';

  const data = await sharp(response.data)
    [format]({ quality: 80 })
    .toBuffer();

  res.setHeader('Content-Type', `image/${format}`);
  res.setHeader('Content-Length', data.length);
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

  return res.status(200).send(data);
};
