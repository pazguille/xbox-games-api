// const Joi = require('joi');
const axios = require('axios');
const cheerio = require('cheerio');

// const { parseStringPromise } = require('xml2js');

// function extractImgFromHtml(html) {
//   const regex = /<img.*?src=["'](.+?)["'].*?>/i;
//   const match = html.match(regex);
//   return match ? match[1].replace('&#038;', '&') : null;
// }

// const schema = Joi.object({
//   lang: Joi.string().default('es'),
//   store: Joi.string().default('ar'),
// });

// const feeds = {
//   es: 'https://news.xbox.com/es-latam/feed/',
//   'en-us': 'https://news.xbox.com/en-us/feed/',
//   'pt-br': 'https://news.xbox.com/pt-br/feed/',
// }

module.exports = async (req, res) => {
  // const { value: query, error } = schema.validate(req.query);

  // if (error) {
  //   return res.status(400).json(error.details.map(err => ({
  //     param: err.path,
  //     type: err.type,
  //     message: err.message,
  //   })));
  // }

  try {
    // const feed = await axios.get('https://latam.ign.com/xbox.xml')
    // const feed = await axios.get('https://www.somosxbox.com/feed')
    // const feed = await axios.get('https://news.xbox.com/en-us/feed/')
    // const feed = await axios.get('https://www.colectivaxbox.com/feeds/posts/default?alt=rss')
    // const feed = await axios.get('https://news.xbox.com/es-latam/feed/')
    //   .then(res => res.data)
    //   .catch(err => { throw { error: err.response.data.error }; });
    // const result = await parseStringPromise(feed);
    // const news = result.rss.channel[0].item.map((n) => ({
    //   title: n.title[0],
    //   image: n['media:thumbnail'][0].$.url,
    //   // image: extractImgFromHtml(n['content:encoded'][0]),
    //   description: n.description[0],
    //   link: n.link[0],
    // }));

    const html = await axios.get('https://news.xbox.com/es-latam/ver-todo/')
      .then(res => res.data)
      .catch(err => { throw { error: err.response.data.error }; });

    const $ = cheerio.load(html);
    const news = Array.from($('.fwpl-col')).map(n => {
      return {
        title: $(n).find('.h2 a').text(),
        image: $(n).find('img').attr('src'),
        link: $(n).find('.h2 a').attr('href'),
      };
    });

    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate');
    return res.status(200).json(news);
  } catch {
    return res.status(200).json({});
  }
}
