const axios = require('axios');
const { parseStringPromise } = require('xml2js');

module.exports = async (req, res) => {
  try {
    // const feed = await axios.get('https://latam.ign.com/xbox.xml')
    // const feed = await axios.get('https://www.somosxbox.com/feed')
    const feed = await axios.get('https://news.xbox.com/es-latam/feed/')
      .then(res => res.data)
      .catch(err => { throw { error: err.response.data.error }; });
    const result = await parseStringPromise(feed);
    const news = result.rss.channel[0].item.map((n) => ({
      title: n.title[0],
      image: n['media:thumbnail'][0].$.url,
      description: n.description[0],
      link: n.link[0],
    }));
    return res.status(200).json(news);
  } catch {
    return res.status(200).json({});
  }
}
