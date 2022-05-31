const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const game = await axios.get(`https://rawg.io/api/games/${req.query.game}`, { params: {
      key: 'c542e67aec3a4340908f9de9e86038af',
    }})
    .then(response => response.data)
    .catch(err => { throw { error: err.response.data.error }; });

    return res.status(200).json({
      // clip: game.clip.clip,
      full: game.clip.clips.full,
      // youtube: game.clip.video,
    });

    // axios.get(game.clip.clips.full,{
    //   responseType: 'stream',
    //   decompress: false,
    // })
    // .then(response => {
    //   res.header(response.headers);
    //   response.data.pipe(res);
    //   // res.header('content-type', response.headers['content-type']);
    //   // res.header('content-disposition', response.headers['content-disposition']);
    // });

  } catch(err) {
    return res.status(200).json({});
  }
}
