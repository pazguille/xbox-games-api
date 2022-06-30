const axios = require('axios');

// https://store-images.s-microsoft.com/image/apps.2792.14572882104595488.f6337262-80e0-4705-aa02-3f9593b0fbd3.10050035-de9c-43b7-ae6e-83930c9ace2c?w=630
// https://api.xstoregames.com/api/image/apps.2792.14572882104595488.f6337262-80e0-4705-aa02-3f9593b0fbd3.10050035-de9c-43b7-ae6e-83930c9ace2c?w=630

module.exports = async (req, res) => {
  const path = req.query.path;
  delete req.query.path;
  const queryString = new URLSearchParams(req.query).toString();
  const microsoft = `https://store-images.s-microsoft.com/image/${path}?${queryString}`;
  const response = await axios.get(microsoft, { responseType: 'arraybuffer' });
  res.setHeader('Content-Type', response.headers['content-type']);
  res.setHeader('Content-Length', response.headers['content-length']);

  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  // res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=31536000, stale-while-revalidate');
  return res.status(200).send(response.data);inm
};
