const axios = require('axios');

function getAnonToken(lang, store) {
  return axios.get(`https://www.xbox.com/${lang}-${store}/accessories`)
    .then(response => response.data.split('"anonToken":"')[1].split('","')[0])
    .catch(err => { throw { error: err }; });
}

module.exports = getAnonToken;
