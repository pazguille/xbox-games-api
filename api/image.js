const axios = require('axios');

// https://store-images.s-microsoft.com/image/apps.2792.14572882104595488.f6337262-80e0-4705-aa02-3f9593b0fbd3.10050035-de9c-43b7-ae6e-83930c9ace2c?w=630
// https://api.xstoregames.com/api/image/apps.2792.14572882104595488.f6337262-80e0-4705-aa02-3f9593b0fbd3.10050035-de9c-43b7-ae6e-83930c9ace2c?w=630

module.exports = async (req, res) => {
  const path = req.query.path;
  delete req.query.path;
  const queryString = new URLSearchParams(req.query).toString();
  const microsoft = `https://store-images.s-microsoft.com/image/${path}?${queryString}`;
  const response = await axios.get(microsoft, { responseType: 'arraybuffer' });
  res.setHeader('content-type', response.headers['content-type']);
  res.setHeader('content-length', response.headers['content-length']);
  res.setHeader('content-modified', response.headers['last-modified']);
  res.setHeader('etag', response.headers.etag);
  res.setHeader('date', response.headers.date);
  res.setHeader('cache-control', 'public, immutable, max-age=31536000');
  return res.status(200).send(response.data);
};
