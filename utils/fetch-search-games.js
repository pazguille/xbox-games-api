const axios = require('axios');
// const fetchGamesDetail = require('./fetch-games-detail');

const API_URL = 'https://www.microsoft.com/msstoreapiprod/api/autosuggest';

function fetchSearchGames(query, store, lang) {
  return axios.get(`${API_URL}`, {
    headers: {
      authority: 'www.microsoft.com',
      'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
      cookie: 'MicrosoftApplicationsTelemetryDeviceId=211abc03-46ae-4c4d-a6a4-a0f1ac6bdd3a; MSFPC=GUID=42b2f962fa9e4bce9bd6be7c4e8a7a34&HASH=42b2&LV=202110&V=4&LU=1635468567571; isFirstSession=1; MUID=12FB65D25EFD633C25F5750D5F20626D; cartMuid=12FB65D25EFD633C25F5750D5F20626D; AEMDC=westus2; ApplicationGatewayAffinityCORS=207ef6035c95e17dbf9681c0dc5ed362; _cs_c=0; _cs_cvars=%7B%7D; at_check=true; AMCVS_EA76ADE95776D2EC7F000101%40AdobeOrg=1; AAMC_mscom_0=REGION%7C4; IR_gbd=microsoft.com; _tt_enable_cookie=1; _ttp=6cac483d-ae84-4bfe-9fa7-ec2eef97821a; utag_main=v_id:018181d070160022931f7487c3c405075004a06d00942$_sn:2$_se:22$_ss:0$_st:1655928258521$dc_visit:2$ses_id:1655926328336%3Bexp-session$_pn:6%3Bexp-session$dc_event:22%3Bexp-session$dc_region:us-east-1%3Bexp-session; _ga=GA1.2.418024655.1659025070; _cs_id=310789a3-7072-acea-e266-f6cafcb1fe5a.1649548818.2.1663429274.1663429274.1613561419.1683712818963; ANON=A=82E3DF75788EA762F011EFA4FFFFFFFF&E=1b66&W=2; NAP=V=1.9&E=1b0c&C=H6itfGEn-hElfVwX7P55RrgS8PahdAYqFx6IIg0BEOgTFu-dhtX9IA&W=2; market=AR; ANON=A=BE4777E357FA360C09C991A6FFFFFFFF&E=1b66&W=3; NAP=V=1.9&E=1b0c&C=Y8Xw7lLoQNkmTjZYzxTBYYsixP177sltbYH6_NDr9SZhyjD7nBWj0Q&W=3; MSCC=NR; MC1=GUID=42b2f962fa9e4bce9bd6be7c4e8a7a34&HASH=42b2&LV=202110&V=4&LU=1635468567571; X-FD-FEATURES=ids=atperf680t2%2c17016t1%2c16730t1%2ctasmigration010%2ccartemberpl%2cdisablenorefunds%2cdaconvertenabled%2cenablescarlettmetadata%2csha-exp-inlyi9j7ql%2cenablesaturn%2cdisableapprestore%2cusewsasmodecheck%2ccjhii185%2cwsaenabledforusonly&imp=514f5f02-3262-4dbd-91f2-912377fe768b; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=1585540135%7CMCIDTS%7C19296%7CMCMID%7C45614095193090071872305091758189058007%7CMCAAMLH-1667732822%7C4%7CMCAAMB-1667732822%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCCIDH%7C1195335159%7CMCOPTOUT-1667135222s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C4.4.0; mbox=session#54c2a3950a894c1682c1af440ca240de#1667129883|PC#54c2a3950a894c1682c1af440ca240de.34_0#1698684924; aam_uuid=46053169368533730202258953430813507288; IR_7803=1667128027820%7C0%7C1667128027820%7C%7C; _uetsid=fe7416e0584211edb54bcd0f5408fc92; _uetvid=bceb5da03a3d11ecb381d1762dca58fc; emailNewsletterDialogShown=1; __RequestVerificationToken=nbiVn3KuWpDCdFP5tiBX8ROqT3g4i5XButYfQfNfEzy4tGYaiLUAWpJnLyOQosOENMBK8d6J_rjkQhHZemU1rLpZe3I1; recentlyShownDialog=1; ak_bmsc=561E7B02D83514743809E27F2CC3930F~000000000000000000000000000000~YAAQBJXAF1J6kxKEAQAA2fySKBHgoUXbdI+Z2HsJ59kmygqeZKzT4yvV9dHmhkH/Czt7rv88t27y4jaTvNNOX4hNDODXHMCM6tHorXdFuC4GGY5RJxZOlXFbnE/y6PsasmJf8gomFXKyvoekIVg3JBvUog7CYxxYu2DoiFXeekYq3WC4HfejCdz/ts1O1DrVCrvTWsmTV30w7fX+7Qk+Asu7b3e9u8VKJs8xXOms6G6SzwWPru07Zk1hABd477d6eIQZxS9g85Ha2FXLX+NDQ/iikoHM/rLDkZhgKgEPT7GNicFKBjkzPKhQ2pjiVrIcCCXyFRCKCB4xIGhQn+tAXijXu/U/g1J9+RgX3ssqig2eskhR4ePn+SGkWh1BbFO85yNv2ch+vPy5JJU+Tg==; _clck=gm3v2i|1|f65|0; _clsk=1fwnk07|1667128029674|1|0|n.clarity.ms/collect; RPSSecAuth=FABqBBRQQdUi8ir%2BBDvtqq0GeThTAplmYANmAAAEgAAACD9rk8fipDQFKAS1QkWMYBGX0eg24DCpwoXJ/ywtL9zKxmhF/OpGgteFhBzzWP1ok6TmbSxg3rDuD6Mg%2BjZy7wLUUVVWL%2BwCU57ZPJ7VLHnSSPhTaAXrLZhb2Slp58Qj73d5zFKxMnvPvHCPeAKfYPC8ov0SH/tzykuXgmBaFM08rjMlux/lkGCgV58twJsocsQ%2B6CRph1C7kFD5RBBEmvg3PatgsOwBjv1OvHKm0YCftOIa2GQGyINKYF5cpZ98UivvtUYCetjfWGStoD/xsgDjmiCaXcKa30J0z9silGMYTAJkJgs7Qb%2B6WMVBi9OpY6DkEqOsJUFV5Avqhgo31JBaDreNyq8CRJuL6lJ5F6/mKfHvjkHTvUST532AVS0JKFU6AiVjBOkpeyJjcehKsEx92D2DRhoR6r6GNY3Mnujo3BvSZ13Zv/T1HUvsNjF0lS34k1q/IYCB%2BooYkTpO7roRE3Cadw2wBRsOagomrl75RHjOI0CXHiNPy7hd875Ybt1wQ1OXeAg7O0p6HrZ0Wl0QK6yCndEr4j8etFo76/Hn/WY7xFBm8urPK1yTYLwHdBbuq5YBgyzAFzwytFWjDURf1HGjrTbqMOIOzJZc0tFfltkPP7UuAkXYqqeyyMpmukNR0kvfE2DxPQc4MBQ%2BhqaDpGOESEHT0dthR3%2B2fPL6f/Igu%2B4lfXGUpVpcx3tr09G4Ukfi4unAKoNzuBxiWJ2S/4aBqQ7Ccs78qqbWeltoBkehklJax4%2BR%2B3AX97ZArSiOfEZib7ABTYc9Py%2BwaxDq%2BDsrgLIpv/qv3jxCqlG4/lKTp407d5nXmusv9/ke3mS9m47Uak9nwOw5PdN0l97Ao%2BKRvIEANCIqPbqGxoQtReRPzbn5DLKFooMU/T3Vul4J35WF05o3EL36rTpOQf0qI4RT7OJ4mglaHWlxgb9y2k1tJXwY5icqPW1gv%2ByJftuf7E4yTZ6QYGBAr2QnFHWvdfsyOm27Hc/SAeShtd50iOjfRpoP6Kt55IZC6IsCUsoe4%2Beke1O%2BZea9P%2BsyowiLU3Jj99b90N4cz%2BzrTxJo9ukFHkEsW3xuPOgE9zgcPTuiJY3AznHumW%2B8wA18BLBmZk1caLw/ICGLiq7azhppXinZ6ui4Rf7St3wULbgdDSb0aFtvn21N%2BvAFYQcbmfyJz3jP8R/Br1F8vPpn/aa3vBy2Cg4BK%2BGn0ASq1/k9GLExm2iPTz6UQH2eG9p8%2BWLZWeBiycuLIpu/k5Wm3JzThKEYI5M7%2BHAvCvwoHkO50%2BGNIL0wQoyZ%2B0m2fRnD5YpvBpja11pXOq/z5jcQuGca2guwr4L6WPpjRotiv91i31WrCeQuqo%2Bz18Y/1BHXB66d4yHsJOCzSyz6CYc1r2MJUS/dNEw4vsAKxT7e26HLWaraxjvx8AEvRfvY68YSX4PXHBQAL38Lcr%2BAnkkRCNTsWgE/kvoVw8M%3D; RPSShare=1; fptctx2=H3ihr9e92IdW6yd1ZgQ9SxGU2kHjwZ7iw8GMzWb%252baYIKQzPDlDB%252bwZbPMAlGgplJ0kCdI4fXQvcDqJ0oblV9Y888xRyXircxirI1DjNsDdcXTfTa4PHD%252f8stfkl5VpZ5BtgW0gyGXvVjKZu2A%252f2rhGfc9qm7hMPtUMoIlOpQBu8YAkw8aq8p8YRtBIaA8bd9Bdsp2MYng4V32ZuDhewu5go7wis3bmedcn7xgFJ8IyEAWOjO9tQD1tzOGvsS0gAq4ZWdWGLy%252bnE0SR1J5JOSFheEzOpdvL38PVF45O4mMKnzHQdUhmhT3UeQ0a5PS281; MS0=1bcadfb1a60e414a85eee1c78fc49521',
      'accept-language': 'es,es-419;q=0.9,en;q=0.8',
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'cache-control': 'max-age=0',
    },
    params: {
      market: `${lang}-${store}`,
      clientId: '7F27B536-CF6B-4C65-8638-A0F8CBDFCA65',
      sources: 'Microsoft-Terms,Iris-Products,DCatAll-Products',
      filter: '+ClientType:StoreWeb',
      counts: '5,1,5',
      query,
    }
  })
  .then(response => response.data.ResultSets[0])
  .then(data => {
    if (!data) { return Promise.reject(new Error()); }
    return data.Suggests
      .filter((result) => result.Source === 'Games')
      .map((result) => ({
        id: result.Metas[0].Value,
        title: result.Title,
        images: {
          boxart: {
            url: result.Metas[2].Value.replace('//store-images.s-microsoft.com', 'https://xbox-games-api.vercel.app/api'),
            width: result.Metas[4].Value,
            height: result.Metas[3].Value,
            type: "boxart"
          },
        }
      }));
  })
  // .then((games) => fetchGamesDetail(games, store, lang))
  .catch(err => { throw { error: err }; });
};

module.exports = fetchSearchGames;
